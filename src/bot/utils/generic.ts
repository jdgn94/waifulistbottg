import { Context } from "telegraf";

import { getByTgId } from "../../controllers/chat";

import db from "../../db/models";

const { Chats } = db;

const getLanguage = async (ctx: Context) => {
  console.log(ctx);
  try {
    const chatId = ctx.message?.chat.id;

    if (chatId) {
      const chat = await getByTgId(chatId.toString());
      console.log(chat);
      return chat.language;
    }
    return;
  } catch (error) {
    throw error;
  }
};

const createChat = async (id: string) => {
  const t = await db.sequelize.transaction();
  try {
    const chat = await Chats.create(
      {
        chatIdTg: id,
        language: "en",
        messageLimit: 100,
        messageQuantity: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { transaction: t }
    );

    await t.commit();
    return chat;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export { getLanguage, createChat };
