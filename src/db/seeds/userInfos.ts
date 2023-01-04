import { Transaction } from "sequelize";
import UserInfos, { UserInfoAttributes } from "../models/userInfo";

const userInfos: UserInfoAttributes[] = [
  {
    id: 1,
    userId: 2,
    level: 41,
    points: 500,
    exp: 128,
    limitExp: 300,
    expMulti: 1,
    expMultiExpire: null,
    favoritePages: 1,
    favoritePagePurchases: 0,
    totalBets: 23,
    totalBetsWon: 3,
    totalBetsLost: 20,
    totalBetsPoints: 77,
    totalBetsPointsWon: 210,
    jail: false,
    jailExpire: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    userId: 3,
    level: 44,
    points: 450,
    exp: 60,
    limitExp: 300,
    expMulti: 1,
    expMultiExpire: null,
    favoritePages: 1,
    favoritePagePurchases: 0,
    totalBets: 38,
    totalBetsWon: 2,
    totalBetsLost: 36,
    totalBetsPoints: 102,
    totalBetsPointsWon: 130,
    jail: false,
    jailExpire: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    userId: 4,
    level: 18,
    points: 250,
    exp: 91,
    limitExp: 175,
    expMulti: 1,
    expMultiExpire: null,
    favoritePages: 1,
    favoritePagePurchases: 0,
    totalBets: 17,
    totalBetsWon: 3,
    totalBetsLost: 14,
    totalBetsPoints: 93,
    totalBetsPointsWon: 160,
    jail: false,
    jailExpire: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    userId: 5,
    level: 1,
    points: 20,
    exp: 61,
    limitExp: 100,
    expMulti: 1,
    expMultiExpire: null,
    favoritePages: 1,
    favoritePagePurchases: 0,
    totalBets: 0,
    totalBetsWon: 0,
    totalBetsLost: 0,
    totalBetsPoints: 0,
    totalBetsPointsWon: 0,
    jail: false,
    jailExpire: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const insertUserInfos = async (t: Transaction) => {
  try {
    let userInfosToInsert: UserInfoAttributes[] = [];

    await Promise.all(
      userInfos.map(async (userInfo) => {
        const userInfoInserted = await UserInfos.findByPk(userInfo.id);

        if (!userInfoInserted) {
          userInfosToInsert.push(userInfo);
        }
      })
    );

    await UserInfos.bulkCreate(userInfosToInsert, { transaction: t });

    global.logger.info(`Inserted user infos ${userInfosToInsert.length} news`);
    return;
  } catch (error) {
    global.logger.error(error);
    throw error;
  }
};

export { insertUserInfos };
