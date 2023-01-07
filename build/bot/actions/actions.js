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
const i18n_1 = __importDefault(require("../../config/i18n"));
const chatController_1 = __importDefault(require("../../controllers/chatController"));
const menuButtons_1 = __importDefault(require("../utils/menuButtons"));
const changeLanguage = (ctx, language) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const chatId = (_a = ctx.chat) === null || _a === void 0 ? void 0 : _a.id.toString();
        if (!chatId)
            throw "no chat";
        const languageChanged = yield chatController_1.default.changeLanguage(chatId, language);
        if (!languageChanged)
            throw "no language changed";
        i18n_1.default.setLocale(language);
        ctx.reply(i18n_1.default.__("languageChanged"), menuButtons_1.default.settingsMenuButtons());
    }
    catch (error) {
        global.logger.error(error);
        ctx.reply(i18n_1.default.__("changeLanguageError"));
        return;
    }
});
exports.default = {
    changeLanguage,
};
