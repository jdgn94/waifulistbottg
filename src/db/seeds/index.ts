import db from "../models/index";
import { insertRarity } from "./rarities";
import { createEvents } from "./events";
import { insertWaifuTypes } from "./waifuTypes";
import { insertFranchises } from "./franchises";
import { insertWaifus } from "./waifus";
import { insertUsers } from "./users";
import { insertChats } from "./chats";
import { insertUserInfos } from "./userInfos";
import { insertWaifuLists } from "./waifuLists";
import { insertWaifuFavoriteLists } from "./waifuFaboriteLists";

class Seed {
  constructor() {}

  async run(): Promise<void> {
    const t = await db.sequelize.transaction();
    try {
      await insertRarity(t);
      await createEvents(t);
      await insertWaifuTypes(t);
      await insertFranchises(t);
      await insertWaifus(t);
      await insertUsers(t);
      await insertChats(t);
      await insertUserInfos(t);
      await insertWaifuLists(t);
      await insertWaifuFavoriteLists(t);

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
