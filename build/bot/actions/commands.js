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
const waifusController_1 = __importDefault(require("../../controllers/waifusController"));
const activeController_1 = __importDefault(require("../../controllers/activeController"));
const chatController_1 = __importDefault(require("../../controllers/chatController"));
const generic_1 = require("../utils/generic");
const userController_1 = __importDefault(require("../../controllers/userController"));
const start = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { chat } = ctx;
        if ((chat === null || chat === void 0 ? void 0 : chat.type) == "group" || (chat === null || chat === void 0 ? void 0 : chat.type) == "supergroup") {
            const chatExistent = yield (0, generic_1.getChatExistent)(ctx);
            console.log(chatExistent);
            if (chatExistent == null) {
                ctx.reply(i18n_1.default.__("initGroupError"));
                return;
            }
            if (chatExistent) {
                ctx.reply(i18n_1.default.__("initGroupExist"));
                return;
            }
            ctx.reply(i18n_1.default.__("initGroupNew"));
            yield (0, generic_1.sendWaifu)(ctx);
            return;
        }
        else {
            const successCreate = yield (0, generic_1.createChantAndUser)(ctx);
            if (!successCreate)
                throw "unexpected error to create private chat";
            const name = (_b = (_a = ctx.message) === null || _a === void 0 ? void 0 : _a.from.first_name) !== null && _b !== void 0 ? _b : "no name";
            ctx.reply(i18n_1.default.__("initPrivate", name), menuButtons_1.default.mainMenuButtons());
            return;
        }
    }
    catch (error) {
        global.logger.error(error);
        ctx.reply(i18n_1.default.__("unexpectedError"));
        throw error;
    }
});
const protecc = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        console.log("hola");
        if (!(0, generic_1.chatIsGroup)(ctx))
            return (0, generic_1.commandOnlyOnGroup)(ctx);
        const { chat, message } = ctx;
        if (!chat || !message || !ctx.message)
            throw "chat or message is required";
        if ("text" in message) {
            const text = message.text;
            const waifuActive = yield waifusController_1.default.proteccWaifuValidator(chat.id.toString(), text);
            if (!waifuActive.captured) {
                const remainingAttemptsQuantity = yield activeController_1.default.updateAttemptStatus(chat.id.toString());
                return ctx.reply(remainingAttemptsQuantity <= 0
                    ? i18n_1.default.__("waifuScape")
                    : i18n_1.default.__n("noWaifuMatch", remainingAttemptsQuantity));
            }
            yield userController_1.default.getUserInfo(ctx);
            const result = yield activeController_1.default.assignWaifu(chat.id.toString(), (_c = ctx.message) === null || _c === void 0 ? void 0 : _c.from.id.toString());
            console.log({ result });
            return ctx.reply(result.message, telegraf_1.Markup.inlineKeyboard([
                telegraf_1.Markup.button.callback(i18n_1.default.__("reportToPolice"), "reporter", !result.sendButtonReport),
            ]));
        }
        return;
    }
    catch (error) {
        global.logger.error(error);
        throw error;
    }
});
const changeLanguage = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message, chat } = ctx;
        if (!chat)
            throw "no chat found";
        const chatId = chat.id.toString();
        if (message && "text" in message) {
            const text = message.text.split(" ");
            let languageSelected = "en";
            text.map((s) => {
                if (s.toLowerCase() == "en")
                    languageSelected = "en";
                if (s.toLowerCase() == "es")
                    languageSelected = "es";
            });
            const languageChanged = yield chatController_1.default.changeLanguage(chatId, languageSelected);
            if (languageChanged == true) {
                i18n_1.default.setLocale(languageSelected);
                return ctx.reply(i18n_1.default.__("languageChanged"));
            }
            else {
                return ctx.reply(i18n_1.default.__("changeLanguageError"));
            }
        }
        throw "unknown message";
    }
    catch (error) {
        global.logger.error(error);
        ctx.reply(i18n_1.default.__("unexpectedError"));
        throw error;
    }
});
// testing
const span = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, generic_1.sendWaifu)(ctx);
});
exports.default = {
    start,
    protecc,
    changeLanguage,
    span,
};
