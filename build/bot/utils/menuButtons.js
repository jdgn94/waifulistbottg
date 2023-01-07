"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const i18n_1 = __importDefault(require("../../config/i18n"));
const mainMenuButtons = () => telegraf_1.Markup.keyboard([
    ["button 1", "button 2"],
    ["button 3", "button 4"],
    ["button 5", "button 6", `⚙️ ${i18n_1.default.__("settings")}`],
]).resize();
const settingsMenuButtons = () => telegraf_1.Markup.keyboard([
    [`💬 ${i18n_1.default.__("changeLanguage")}`],
    [`🔙 ${i18n_1.default.__("back")}`],
]).resize();
exports.default = { mainMenuButtons, settingsMenuButtons };
