import { Context } from "telegraf";

import db from "../../db/models";
import chatsController from "../../controllers/chatController";
import i18n from "../../config/i18n";

const { Chats, Users, Actives } = db;

// private functions
const addCountToChat = async (ctx: Context) => {
  const t = await db.sequelize.transaction();
  try {
    const chatIdTg = ctx.chat?.id.toString();
    if (!chatIdTg) throw "chat not found";

    const chat = await Chats.findOne({ where: { chatIdTg } });

    if (!chat) throw "chat not found";

    const active = await Actives.findOne({ where: { chatId: chat.id } });

    if (active) return;

    let newMessageQuantity = chat.messageQuantity + 1;
    if (newMessageQuantity >= chat.messageLimit) {
      newMessageQuantity = 0;
    }

    await chat.update(
      { messageQuantity: newMessageQuantity },
      { transaction: t }
    );
    await t.commit();

    if (newMessageQuantity == 0) sendWaifu(ctx);
  } catch (error) {
    await t.rollback();
    global.logger.error(error);
    throw error;
  }
};

// external functions
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

const createChantAndUser = async (ctx: Context) => {
  const t = await db.sequelize.transaction();
  try {
    const chatId = ctx.message?.chat.id;
    const userId = ctx.message?.from.id;
    const username = ctx.message?.from.username;

    if (!chatId || !userId || !username) throw "unexpected data";

    const chat = await Chats.findOrCreate({
      where: { chatIdTg: chatId.toString() },
      defaults: {
        chatIdTg: chatId.toString(),
        language: "en",
        messageLimit: 100,
        messageQuantity: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      transaction: t,
    });

    const user = await Users.findOrCreate({
      where: { userIdTg: userId },
      defaults: {
        userIdTg: userId,
        nickname: username,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      transaction: t,
    });

    if (!chat[0] || !user[0]) throw "error to create";

    await t.commit();
    return true;
  } catch (error) {
    await t.rollback();
    global.logger.error(error);
    throw error;
  }
};

const getLanguage = async (ctx: Context) => {
  try {
    const chatId = ctx.message?.chat.id;

    if (chatId) {
      const chat = await chatsController.getByTgId(chatId.toString());
      return chat?.language ?? "en";
    }
    return;
  } catch (error) {
    global.logger.error(error);
    throw error;
  }
};

const getChatExistent = async (ctx: Context) => {
  const chatId = ctx.message?.chat.id;

  if (chatId) {
    let chat = await chatsController.getByTgId(chatId.toString());
    console.log(chat);
    if (chat) return true;

    chat = await createChat(chatId.toString());

    return false;
  }

  return null;
};

const addMessageCount = async (ctx: Context) => {
  try {
    console.log("hola vale");
    const { chat } = ctx;
    console.log(chat?.type);
    if (!chatIsGroup(ctx)) return;
    console.log("debo aumentar la cantidad de mensajes");
    return await addCountToChat(ctx);
  } catch (error) {
    global.logger.error(error);
    throw error;
  }
};

const sendWaifu = async (ctx: Context) => {
  try {
    const { chat } = ctx;
    if (!chat) throw "chat not found";
    const waifuSenderValues = await chatsController.sendWaifu(
      chat?.id.toString()
    );

    if (waifuSenderValues.success) {
      return ctx.replyWithPhoto(
        {
          url: waifuSenderValues.imageUrl,
          filename: waifuSenderValues.filename,
        },
        {
          caption: i18n.__("waufuSender"),
        }
      );
    }
    return ctx.reply(i18n.__("errorSendWaifu"));
  } catch (error) {
    global.logger.error(error);
    ctx.reply(i18n.__("errorSendWaifu"));
    throw error;
  }
};

const chatIsGroup = (ctx: Context) => {
  const { chat } = ctx;
  return chat?.type == "group" || chat?.type == "supergroup";
};

const commandOnlyOnGroup = async (ctx: Context) => {
  return ctx.reply(i18n.__("commandOnlyOnGroup"));
};

export {
  createChat,
  createChantAndUser,
  getLanguage,
  getChatExistent,
  addMessageCount,
  sendWaifu,
  chatIsGroup,
  commandOnlyOnGroup,
};
