import { Context } from "telegraf";

import i18n from "../../config/i18n";
import chatController from "../../controllers/chatController";
import menuButtons from "../utils/menuButtons";

const changeLanguage = async (ctx: Context, language: "en" | "es") => {
  try {
    const chatId = ctx.chat?.id.toString();
    if (!chatId) throw "no chat";

    const languageChanged = await chatController.changeLanguage(
      chatId,
      language
    );

    if (!languageChanged) throw "no language changed";

    i18n.setLocale(language);
    ctx.reply(i18n.__("languageChanged"), menuButtons.settingsMenuButtons());
  } catch (error) {
    global.logger.error(error);
    ctx.reply(i18n.__("changeLanguageError"));
    return;
  }
};

export default {
  changeLanguage,
};
