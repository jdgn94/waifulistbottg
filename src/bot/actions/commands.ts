import { Context, Markup } from "telegraf";

import i18n from "../../config/i18n";
import menuButton from "../utils/menuButtons";
import waifusController from "../../controllers/waifusController";
import activeController from "../../controllers/activeController";
import chatController from "../../controllers/chatController";
import {
  chatIsGroup,
  createChantAndUser,
  getChatExistent,
  sendWaifu,
  commandOnlyOnGroup,
} from "../utils/generic";
import userController from "../../controllers/userController";

const start = async (ctx: Context) => {
  try {
    const { chat } = ctx;
    if (chat?.type == "group" || chat?.type == "supergroup") {
      const chatExistent = await getChatExistent(ctx);
      console.log(chatExistent);
      if (chatExistent == null) {
        ctx.reply(i18n.__("initGroupError"));
        return;
      }

      if (chatExistent) {
        ctx.reply(i18n.__("initGroupExist"));
        return;
      }

      ctx.reply(i18n.__("initGroupNew"));
      await sendWaifu(ctx);
      return;
    } else {
      const successCreate = await createChantAndUser(ctx);
      if (!successCreate) throw "unexpected error to create private chat";

      const name = ctx.message?.from.first_name ?? "no name";
      ctx.reply(i18n.__("initPrivate", name), menuButton.mainMenuButtons());
      return;
    }
  } catch (error) {
    global.logger.error(error);
    ctx.reply(i18n.__("unexpectedError"));
    throw error;
  }
};

const protecc = async (ctx: Context) => {
  try {
    console.log("hola");
    if (!chatIsGroup(ctx)) return commandOnlyOnGroup(ctx);

    const { chat, message } = ctx;

    if (!chat || !message || !ctx.message) throw "chat or message is required";

    if ("text" in message) {
      const text = message.text;
      const waifuActive = await waifusController.proteccWaifuValidator(
        chat.id.toString(),
        text
      );

      if (!waifuActive.captured) {
        const remainingAttemptsQuantity =
          await activeController.updateAttemptStatus(chat.id.toString());
        return ctx.reply(
          remainingAttemptsQuantity <= 0
            ? i18n.__("waifuScape")
            : i18n.__n("noWaifuMatch", remainingAttemptsQuantity)
        );
      }
      await userController.getUserInfo(ctx);

      const result = await activeController.assignWaifu(
        chat.id.toString(),
        ctx.message?.from.id.toString()
      );
      console.log({ result });

      return ctx.reply(
        result.message,
        Markup.inlineKeyboard([
          Markup.button.callback(
            i18n.__("reportToPolice"),
            "reporter",
            !result.sendButtonReport
          ),
        ])
      );
    }
    return;
  } catch (error) {
    global.logger.error(error);
    throw error;
  }
};

const changeLanguage = async (ctx: Context) => {
  try {
    const { message, chat } = ctx;
    if (!chat) throw "no chat found";
    const chatId = chat.id.toString();
    if (message && "text" in message) {
      const text = message.text.split(" ");
      let languageSelected: "en" | "es" = "en";
      text.map((s) => {
        if (s.toLowerCase() == "en") languageSelected = "en";
        if (s.toLowerCase() == "es") languageSelected = "es";
      });

      const languageChanged = await chatController.changeLanguage(
        chatId,
        languageSelected
      );

      if (languageChanged == true) {
        i18n.setLocale(languageSelected);
        return ctx.reply(i18n.__("languageChanged"));
      } else {
        return ctx.reply(i18n.__("changeLanguageError"));
      }
    }
    throw "unknown message";
  } catch (error) {
    global.logger.error(error);
    ctx.reply(i18n.__("unexpectedError"));
    throw error;
  }
};

// testing
const span = async (ctx: Context) => {
  await sendWaifu(ctx);
};

export default {
  start,
  protecc,
  changeLanguage,
  span,
};
