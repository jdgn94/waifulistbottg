import { Context, Markup } from "telegraf";

import i18n from "../../config/i18n";
import menuButton from "../utils/menuButtons";
import waifusController from "../../controllers/waifusController";
import activeController from "../../controllers/activeController";
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

      const result = await activeController.assingWaifu(
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

const span = async (ctx: Context) => {
  await sendWaifu(ctx);
};

export default {
  start,
  protecc,
  span,
};
