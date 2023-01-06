import db from "../db/models";
import waifusController from "./waifusController";

const { Chats, Actives } = db;

interface DataWaifuCreated {
  success: boolean;
  imageUrl: string;
  filename: string;
}

const getByTgId = async (id: string) => {
  try {
    const chat = await Chats.findOne({
      where: { chatIdTg: id },
    });
    return chat;
  } catch (error) {
    throw error;
  }
};

const changeLanguage = async (chatIdTg: string, language: "en" | "es") => {
  const t = await db.sequelize.transaction();
  try {
    let chat = await Chats.findOne({
      where: { chatIdTg },
    });

    if (!chat) throw "chat not found";

    await chat.update({ language }, { transaction: t });

    await t.commit();
    return true;
  } catch (error) {
    await t.rollback();
    global.logger.error(error);
    throw error;
  }
};

const sendWaifu = async (chatIdTg: string) => {
  const t = await db.sequelize.transaction();
  try {
    const chat = await getByTgId(chatIdTg);

    if (!chat) throw "chat not found";

    const active = await Actives.findOne({
      where: { chatId: chat.id },
    });

    if (active) return { success: false } as DataWaifuCreated;

    const waifu = await waifusController.searchRandomWaifu();

    await Actives.create(
      {
        chatId: chat.id,
        waifuId: waifu.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { transaction: t }
    );

    await t.commit();
    return {
      success: true,
      imageUrl: waifu.imageUrl,
      filename: waifu.publicId,
    } as DataWaifuCreated;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export default { changeLanguage, getByTgId, sendWaifu };
