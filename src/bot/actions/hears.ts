import { Context, Markup } from "telegraf";

import i18n from "../../config/i18n";
import menuButtons from "../utils/menuButtons";
import { chatIsGroup } from "../utils/generic";

// mein menu
const settings = async (ctx: Context) => {
  if (chatIsGroup(ctx)) return;

  ctx.reply(i18n.__("settings"), menuButtons.settingsMenuButtons());
  return;
};

// settings menu
const changeLanguage = async (ctx: Context) => {
  if (chatIsGroup(ctx)) return;

  ctx.reply(
    i18n.__(`changeLanguage`),
    Markup.inlineKeyboard([
      Markup.button.callback(i18n.__("en"), "en"),
      Markup.button.callback(i18n.__("es"), "es"),
    ])
  );
};

// back menu
const back = async (ctx: Context) => {
  if (chatIsGroup(ctx)) return;

  ctx.reply(i18n.__("back"), menuButtons.mainMenuButtons());
};

export default { settings, changeLanguage, back };
