import { Transaction } from "sequelize";
import { Context } from "telegraf";

import db from "../db/models";
import utilsController from "./utilsController";

const { Users, UserInfos, Waifus } = db;

const getUserInfo = async (ctx: Context) => {
  const t = await db.sequelize.transaction();
  try {
    const { message } = ctx;

    if (!message) throw "no message found";
    let user = await Users.findOrCreate({
      where: { userIdTg: message.from.id },
      defaults: {
        nickname: message.from.username ?? message.from.first_name,
        userIdTg: message.from.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      transaction: t,
    });

    if (user[1] == false) {
      await user[0].update(
        {
          nickname: message.from.username ?? message.from.first_name,
          updatedAt: new Date(),
        },
        { transaction: t }
      );
    }

    await UserInfos.findOrCreate({
      where: { userId: user[0].id },
      defaults: {
        userId: user[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    await t.commit();
    const userUpdated = await Users.findOne({
      where: { id: user[0].id },
      include: [Users.associations.userInfo],
    });
    if (!userUpdated) throw "user not found";
    return userUpdated;
  } catch (error) {
    await t.rollback();
    global.console.error(error);
    throw error;
  }
};

const getUserById = async (id: number) => {
  try {
    const user = await Users.findOne({
      where: { id },
      include: [Users.associations.userInfo],
    });

    if (!user) throw "user not found";
    return user;
  } catch (error) {
    global.logger.error(error);
    throw error;
  }
};

const addExpToUser = async (
  userId: number,
  waifuId: number,
  t: Transaction | undefined
) => {
  const trans = t ?? (await db.sequelize.transaction());
  try {
    let userInfo = await UserInfos.findOne({ where: { userId } });
    if (!userInfo) throw "no user info";
    const waifu = await Waifus.findOne({
      where: { id: waifuId },
      include: [Waifus.associations.event, Waifus.associations.rarity],
    });
    if (!waifu) throw "waifu not found";

    // aqui ira la logica de mas o menos experiencia y puntos por la rareza de la waifu
    const addExp = waifu.favPublicId
      ? utilsController.getRamdomIntegerNumber(15, 20)
      : utilsController.getRamdomIntegerNumber(10, 15);
    const addExpMultipler = Math.round(addExp * userInfo.expMulti);
    const newExp =
      Math.round(userInfo.exp * addExpMultipler) % userInfo.limitExp;
    const newLevel =
      newExp < userInfo.exp ? userInfo.level + 1 : userInfo.level;
    const newLimitExp = Math.round(newLevel / 5) * 25 + 100;
    const newPoints = userInfo.points + (waifu.favPublicId ? 3 : 1);

    await userInfo.update(
      {
        exp: newExp,
        level: newLevel,
        limitExp: newLimitExp,
        points: newPoints,
      },
      { transaction: t }
    );
    if (!t) await trans.commit();
    return {
      expWon: addExpMultipler,
      level: newLevel,
      levelUp: newLevel > userInfo.level,
    };
  } catch (error) {
    if (!t) await trans.rollback();
    global.logger.error(error);
    throw error;
  }
};

export default { getUserInfo, getUserById, addExpToUser };
