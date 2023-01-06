import { Transaction } from "sequelize";
import db from "../db/models";
import waifusController from "./waifusController";

const { Waifus, Chats, Actives, Users } = db;

const _getActiveData = async (chatIdTg: string) => {
  try {
    const chat = await Chats.findOne({ where: { chatIdTg } });
    if (!chat) throw "no chat found";

    const active = await Actives.findOne({ where: { chatId: chat.id } });
    if (!active) throw "no actives found";

    return active;
  } catch (error) {
    global.logger.error(error);
    throw error;
  }
};

const getWaifuActiveToChatIdTg = async (chatIdTg: string) => {
  try {
    const active = await _getActiveData(chatIdTg);
    const waifu = await Waifus.findOne({
      where: { id: active.waifuId },
      include: [Waifus.associations.waifuType],
    });

    console.log("datos de la waifu activa papa: ", waifu);

    if (!waifu) throw "no waifu found";

    return waifu;
  } catch (error) {
    global.logger.error(error);
    throw error;
  }
};

const updateAttemptStatus = async (chatIdTg: string) => {
  const t = await db.sequelize.transaction();
  try {
    const active = await _getActiveData(chatIdTg);
    let newAttempt = active.attempts - 1;
    if (newAttempt <= 0) {
      await active.destroy({ transaction: t });
    } else {
      await active.update(
        { attempts: newAttempt, updatedAt: new Date() },
        { transaction: t }
      );
    }

    await t.commit();
    return newAttempt;
  } catch (error) {
    global.logger.error(error);
    throw error;
  }
};

const deleteWaifuActiveFromId = async (id: number, t: Transaction) => {
  try {
    await Actives.destroy({ where: { id }, transaction: t });
  } catch (error) {
    global.logger.error(error);
    throw error;
  }
};

const assingWaifu = async (chatIdTg: string, userIdTg: string) => {
  const t = await db.sequelize.transaction();
  try {
    const active = await _getActiveData(chatIdTg);
    const user = await Users.findOne({ where: { userIdTg } });
    if (!user) throw "user not found";

    const result = await waifusController.addWaifuToUserList(
      active.waifuId,
      user.id,
      t
    );

    await deleteWaifuActiveFromId(active.id, t);
    await t.commit();
    return result;
  } catch (error) {
    await t.rollback();
    global.logger.error(error);
    throw error;
  }
};

export default {
  getWaifuActiveToChatIdTg,
  updateAttemptStatus,
  deleteWaifuActiveFromId,
  assingWaifu,
};
