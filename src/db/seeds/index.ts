import db from "../models/index";
import { insertRarity } from "./rarities";
import { createEvents } from "./events";

class Seed {
  constructor() {}

  async run(): Promise<void> {
    const t = await db.sequelize.transaction();
    try {
      await insertRarity(t);
      await createEvents(t);

      await t.commit();
      global.logger.info("seeds inserted");
    } catch (error) {
      await t.rollback();
      console.error(error);
      global.logger.error(error);
    }
    return;
  }
}

export default Seed;
