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
exports.commandOnlyOnGroup = exports.chatIsGroup = exports.sendWaifu = exports.addMessageCount = exports.getChatExistent = exports.getLanguage = exports.createChantAndUser = exports.createChat = void 0;
const models_1 = __importDefault(require("../../db/models"));
const chatController_1 = __importDefault(require("../../controllers/chatController"));
const i18n_1 = __importDefault(require("../../config/i18n"));
const { Chats, Users, Actives } = models_1.default;
// private functions
const addCountToChat = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const t = yield models_1.default.sequelize.transaction();
    try {
        const chatIdTg = (_a = ctx.chat) === null || _a === void 0 ? void 0 : _a.id.toString();
        if (!chatIdTg)
            throw "chat not found";
        const chat = yield Chats.findOne({ where: { chatIdTg } });
        if (!chat)
            throw "chat not found";
        const active = yield Actives.findOne({ where: { chatId: chat.id } });
        if (active)
            return;
        let newMessageQuantity = chat.messageQuantity + 1;
        if (newMessageQuantity >= chat.messageLimit) {
            newMessageQuantity = 0;
        }
        yield chat.update({ messageQuantity: newMessageQuantity }, { transaction: t });
        yield t.commit();
        if (newMessageQuantity == 0)
            sendWaifu(ctx);
    }
    catch (error) {
        yield t.rollback();
        global.logger.error(error);
        throw error;
    }
});
// external functions
const createChat = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield models_1.default.sequelize.transaction();
    try {
        const chat = yield Chats.create({
            chatIdTg: id,
            language: "en",
            messageLimit: 100,
            messageQuantity: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        }, { transaction: t });
        yield t.commit();
        return chat;
    }
    catch (error) {
        yield t.rollback();
        throw error;
    }
});
exports.createChat = createChat;
const createChantAndUser = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    const t = yield models_1.default.sequelize.transaction();
    try {
        const chatId = (_b = ctx.message) === null || _b === void 0 ? void 0 : _b.chat.id;
        const userId = (_c = ctx.message) === null || _c === void 0 ? void 0 : _c.from.id;
        const username = (_d = ctx.message) === null || _d === void 0 ? void 0 : _d.from.username;
        if (!chatId || !userId || !username)
            throw "unexpected data";
        const chat = yield Chats.findOrCreate({
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
        const user = yield Users.findOrCreate({
            where: { userIdTg: userId },
            defaults: {
                userIdTg: userId,
                nickname: username,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            transaction: t,
        });
        if (!chat[0] || !user[0])
            throw "error to create";
        yield t.commit();
        return true;
    }
    catch (error) {
        yield t.rollback();
        global.logger.error(error);
        throw error;
    }
});
exports.createChantAndUser = createChantAndUser;
const getLanguage = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    try {
        const chatId = (_e = ctx.message) === null || _e === void 0 ? void 0 : _e.chat.id;
        if (chatId) {
            const chat = yield chatController_1.default.getByTgId(chatId.toString());
            return (_f = chat === null || chat === void 0 ? void 0 : chat.language) !== null && _f !== void 0 ? _f : "en";
        }
        return;
    }
    catch (error) {
        global.logger.error(error);
        throw error;
    }
});
exports.getLanguage = getLanguage;
const getChatExistent = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const chatId = (_g = ctx.message) === null || _g === void 0 ? void 0 : _g.chat.id;
    if (chatId) {
        let chat = yield chatController_1.default.getByTgId(chatId.toString());
        console.log(chat);
        if (chat)
            return true;
        chat = yield createChat(chatId.toString());
        return false;
    }
    return null;
});
exports.getChatExistent = getChatExistent;
const addMessageCount = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("hola vale");
        const { chat } = ctx;
        console.log(chat === null || chat === void 0 ? void 0 : chat.type);
        if (!chatIsGroup(ctx))
            return;
        console.log("debo aumentar la cantidad de mensajes");
        return yield addCountToChat(ctx);
    }
    catch (error) {
        global.logger.error(error);
        throw error;
    }
});
exports.addMessageCount = addMessageCount;
const sendWaifu = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chat } = ctx;
        if (!chat)
            throw "chat not found";
        const waifuSenderValues = yield chatController_1.default.sendWaifu(chat === null || chat === void 0 ? void 0 : chat.id.toString());
        if (waifuSenderValues.success) {
            return ctx.replyWithPhoto({
                url: waifuSenderValues.imageUrl,
                filename: waifuSenderValues.filename,
            }, {
                caption: i18n_1.default.__("waufuSender"),
            });
        }
        return ctx.reply(i18n_1.default.__("errorSendWaifu"));
    }
    catch (error) {
        global.logger.error(error);
        ctx.reply(i18n_1.default.__("errorSendWaifu"));
        throw error;
    }
});
exports.sendWaifu = sendWaifu;
const chatIsGroup = (ctx) => {
    const { chat } = ctx;
    return (chat === null || chat === void 0 ? void 0 : chat.type) == "group" || (chat === null || chat === void 0 ? void 0 : chat.type) == "supergroup";
};
exports.chatIsGroup = chatIsGroup;
const commandOnlyOnGroup = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    return ctx.reply(i18n_1.default.__("commandOnlyOnGroup"));
});
exports.commandOnlyOnGroup = commandOnlyOnGroup;
