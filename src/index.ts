import api from "./api";
import bot from "./bot";
import db from "./db/models";

const main = async (): Promise<void> => {
  try {
    const port = api.get("port");
    api.listen(port);
    global.logger.info(`server on port ${port}`);
    db.sequelize.authenticate();
    global.logger.info(`database connected`);
    await db.sequelize.sync();
    global.logger.info(`database sync`);
    bot.launch();
    global.logger.info(`api connected`);
  } catch (error) {
    console.error(error);
    global.logger.error(error);
  }
};

main();
