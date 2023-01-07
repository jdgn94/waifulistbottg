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
const models_1 = __importDefault(require("../db/models"));
const waifusController_1 = __importDefault(require("./waifusController"));
const { Chats, Actives } = models_1.default;
const getByTgId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat = yield Chats.findOne({
            where: { chatIdTg: id },
        });
        return chat;
    }
    catch (error) {
        throw error;
    }
});
const changeLanguage = (chatIdTg, language) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield models_1.default.sequelize.transaction();
    try {
        let chat = yield Chats.findOne({
            where: { chatIdTg },
        });
        if (!chat)
            throw "chat not found";
        yield chat.update({ language }, { transaction: t });
        yield t.commit();
        return true;
    }
    catch (error) {
        yield t.rollback();
        global.logger.error(error);
        throw error;
    }
});
const sendWaifu = (chatIdTg) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield models_1.default.sequelize.transaction();
    try {
        const chat = yield getByTgId(chatIdTg);
        if (!chat)
            throw "chat not found";
        const active = yield Actives.findOne({
            where: { chatId: chat.id },
        });
        if (active)
            return { success: false };
        const waifu = yield waifusController_1.default.searchRandomWaifu();
        yield Actives.create({
            chatId: chat.id,
            waifuId: waifu.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }, { transaction: t });
        yield t.commit();
        return {
            success: true,
            imageUrl: waifu.imageUrl,
            filename: waifu.publicId,
        };
    }
    catch (error) {
        yield t.rollback();
        throw error;
    }
});
exports.default = { changeLanguage, getByTgId, sendWaifu };
