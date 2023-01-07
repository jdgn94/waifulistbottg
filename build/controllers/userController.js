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
const utilsController_1 = __importDefault(require("./utilsController"));
const { Users, UserInfos, Waifus } = models_1.default;
const getUserInfo = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const t = yield models_1.default.sequelize.transaction();
    try {
        const { message } = ctx;
        if (!message)
            throw "no message found";
        let user = yield Users.findOrCreate({
            where: { userIdTg: message.from.id },
            defaults: {
                nickname: (_a = message.from.username) !== null && _a !== void 0 ? _a : message.from.first_name,
                userIdTg: message.from.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            transaction: t,
        });
        if (user[1] == false) {
            yield user[0].update({
                nickname: (_b = message.from.username) !== null && _b !== void 0 ? _b : message.from.first_name,
                updatedAt: new Date(),
            }, { transaction: t });
        }
        yield UserInfos.findOrCreate({
            where: { userId: user[0].id },
            defaults: {
                userId: user[0].id,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
        yield t.commit();
        const userUpdated = yield Users.findOne({
            where: { id: user[0].id },
            include: [Users.associations.userInfo],
        });
        if (!userUpdated)
            throw "user not found";
        return userUpdated;
    }
    catch (error) {
        yield t.rollback();
        global.console.error(error);
        throw error;
    }
});
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Users.findOne({
            where: { id },
            include: [Users.associations.userInfo],
        });
        if (!user)
            throw "user not found";
        return user;
    }
    catch (error) {
        global.logger.error(error);
        throw error;
    }
});
const addExpToUser = (userId, waifuId, t) => __awaiter(void 0, void 0, void 0, function* () {
    const trans = t !== null && t !== void 0 ? t : (yield models_1.default.sequelize.transaction());
    try {
        let userInfo = yield UserInfos.findOne({ where: { userId } });
        if (!userInfo)
            throw "no user info";
        const waifu = yield Waifus.findOne({
            where: { id: waifuId },
            include: [Waifus.associations.event, Waifus.associations.rarity],
        });
        if (!waifu)
            throw "waifu not found";
        // aqui ira la logica de mas o menos experiencia y puntos por la rareza de la waifu
        const addExp = waifu.favPublicId
            ? utilsController_1.default.getRamdomIntegerNumber(15, 20)
            : utilsController_1.default.getRamdomIntegerNumber(10, 15);
        const addExpMultipler = Math.round(addExp * userInfo.expMulti);
        const newExp = Math.round(userInfo.exp * addExpMultipler) % userInfo.limitExp;
        const newLevel = newExp < userInfo.exp ? userInfo.level + 1 : userInfo.level;
        const newLimitExp = Math.round(newLevel / 5) * 25 + 100;
        const newPoints = userInfo.points + (waifu.favPublicId ? 3 : 1);
        yield userInfo.update({
            exp: newExp,
            level: newLevel,
            limitExp: newLimitExp,
            points: newPoints,
        }, { transaction: t });
        if (!t)
            yield trans.commit();
        return {
            expWon: addExpMultipler,
            level: newLevel,
            levelUp: newLevel > userInfo.level,
        };
    }
    catch (error) {
        if (!t)
            yield trans.rollback();
        global.logger.error(error);
        throw error;
    }
});
exports.default = { getUserInfo, getUserById, addExpToUser };
