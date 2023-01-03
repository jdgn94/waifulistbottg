import sequelize from "sequelize";
import Franchises from "./franchise";
import Events from "./event";
import WaifuTypes from "./waifuType";
import WaifuRarities from "./waifuRarity";
import Waifus from "./waifu";
import Chats from "./chat";
import Users from "./user";
import WaifuLists from "./waifuList";
import WaifuFavoriteLists from "./waifuFavoriteList";
import Actives from "./active";
import Trades from "./trade";
import UserInfos from "./userInfo";
import SpecialImages from "./specialImage";
import SpecialImagesWaifus from "./specialImageWaifu";
import WaifuSpecialLists from "./waifuSpecialList";
import Bets from "./bet";

import connect from "../config";

const db = {
  sequelize: connect,
  Sequelize: sequelize,
  Franchises,
  Events,
  WaifuTypes,
  WaifuRarities,
  Waifus,
  Chats,
  Users,
  WaifuLists,
  WaifuFavoriteLists,
  Actives,
  Trades,
  UserInfos,
  SpecialImages,
  SpecialImagesWaifus,
  WaifuSpecialLists,
  Bets,
};

export default db;
