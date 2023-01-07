import api from "./api";
import bot from "./bot";
import db from "./db/models";
import Seeds from "./db/seeds";

const main = async (): Promise<void> => {
  try {
    const seeds = new Seeds();
    const port = api.get("port");
    api.listen(port);
    global.logger.info(`server on port ${port}`);
    db.sequelize.authenticate();
    global.logger.info(`database connected`);
    await db.sequelize.sync({ force: false, alter: false });
    global.logger.info(`database sync`);
    bot.launch();
    global.logger.info(`bot launch`);
    await seeds.run();
  } catch (error) {
    console.error(error);
    global.logger.error(error);
  }
};

main();
