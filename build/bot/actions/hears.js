"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const i18n_1 = __importDefault(require("../../config/i18n"));
const menuButtons_1 = __importDefault(require("../utils/menuButtons"));
const generic_1 = require("../utils/generic");
// mein menu
const settings = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, generic_1.chatIsGroup)(ctx))
        return;
    ctx.reply(i18n_1.default.__("settings"), menuButtons_1.default.settingsMenuButtons());
    return;
});
// settings menu
const changeLanguage = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, generic_1.chatIsGroup)(ctx))
        return;
    ctx.reply(i18n_1.default.__(`changeLanguage`), telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.callback(i18n_1.default.__("en"), "en"),
        telegraf_1.Markup.button.callback(i18n_1.default.__("es"), "es"),
    ]));
});
// back menu
const back = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, generic_1.chatIsGroup)(ctx))
        return;
    ctx.reply(i18n_1.default.__("back"), menuButtons_1.default.mainMenuButtons());
});
exports.default = { settings, changeLanguage, back };
