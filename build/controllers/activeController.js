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
const { Waifus, Chats, Actives, Users } = models_1.default;
const _getActiveData = (chatIdTg) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat = yield Chats.findOne({ where: { chatIdTg } });
        if (!chat)
            throw "no chat found";
        const active = yield Actives.findOne({ where: { chatId: chat.id } });
        if (!active)
            throw "no actives found";
        return active;
    }
    catch (error) {
        global.logger.error(error);
        throw error;
    }
});
const getWaifuActiveToChatIdTg = (chatIdTg) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const active = yield _getActiveData(chatIdTg);
        const waifu = yield Waifus.findOne({
            where: { id: active.waifuId },
            include: [Waifus.associations.waifuType],
        });
        console.log("datos de la waifu activa papa: ", waifu);
        if (!waifu)
            throw "no waifu found";
        return waifu;
    }
    catch (error) {
        global.logger.error(error);
        throw error;
    }
});
const updateAttemptStatus = (chatIdTg) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield models_1.default.sequelize.transaction();
    try {
        const active = yield _getActiveData(chatIdTg);
        let newAttempt = active.attempts - 1;
        if (newAttempt <= 0) {
            yield active.destroy({ transaction: t });
        }
        else {
            yield active.update({ attempts: newAttempt, updatedAt: new Date() }, { transaction: t });
        }
        yield t.commit();
        return newAttempt;
    }
    catch (error) {
        global.logger.error(error);
        throw error;
    }
});
const deleteWaifuActiveFromId = (id, t) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Actives.destroy({ where: { id }, transaction: t });
    }
    catch (error) {
        global.logger.error(error);
        throw error;
    }
});
const assignWaifu = (chatIdTg, userIdTg) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield models_1.default.sequelize.transaction();
    try {
        const active = yield _getActiveData(chatIdTg);
        const user = yield Users.findOne({ where: { userIdTg } });
        if (!user)
            throw "user not found";
        const result = yield waifusController_1.default.addWaifuToUserList(active.waifuId, user.id, t);
        yield deleteWaifuActiveFromId(active.id, t);
        yield t.commit();
        return result;
    }
    catch (error) {
        yield t.rollback();
        global.logger.error(error);
        throw error;
    }
});
exports.default = {
    getWaifuActiveToChatIdTg,
    updateAttemptStatus,
    deleteWaifuActiveFromId,
    assignWaifu,
};
