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
const activeController_1 = __importDefault(require("./activeController"));
const userController_1 = __importDefault(require("./userController"));
const i18n_1 = __importDefault(require("../config/i18n"));
const { Waifus, WaifuLists } = models_1.default;
// private functions
const _getWaifuTypeNumberToMessage = (waifuTypeNumber) => {
    switch (waifuTypeNumber) {
        case 3:
            return 0;
        case 4:
            return 1;
        case 2 | 7 | 8:
            return 2;
        case 1 | 5:
            return 3;
        default:
            return 4;
    }
};
const _getWaifuAgeNumberToMessage = (waifuAgeNumber) => {
    const ageCategoryValue = waifuAgeNumber == 0 || waifuAgeNumber >= 70
        ? 0
        : waifuAgeNumber < 16
            ? 1
            : waifuAgeNumber >= 16 && waifuAgeNumber < 18
                ? 2
                : waifuAgeNumber >= 18 && waifuAgeNumber < 40
                    ? 3
                    : 4;
    return ageCategoryValue;
};
// public functions
const getWaifuById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const waifu = yield Waifus.findOne({
            where: { id },
            include: [
                Waifus.associations.event,
                Waifus.associations.franchise,
                Waifus.associations.rarity,
                Waifus.associations.waifuType,
            ],
        });
        if (!waifu)
            throw "no waifu found";
        return waifu;
    }
    catch (error) {
        global.logger.error(error);
        throw error;
    }
});
const proteccWaifuValidator = (chatTgId, text) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const waifuActive = yield activeController_1.default.getWaifuActiveToChatIdTg(chatTgId);
        const regExp = new RegExp(/[\s_.,-]/);
        let characterCaptured = { captured: false, waifu: waifuActive };
        const namesSenders = text.split(regExp);
        const allNicknamesCharacter = (_b = (_a = waifuActive.nickname) === null || _a === void 0 ? void 0 : _a.split(regExp)) !== null && _b !== void 0 ? _b : [];
        const allNamesCharacter = waifuActive.name.split(regExp);
        const namesSendersLength = namesSenders.length;
        const nicknamesLength = allNicknamesCharacter.length;
        const namesWaifuLength = allNamesCharacter.length;
        console.log(namesSenders, allNicknamesCharacter, allNamesCharacter);
        // verify nicknames
        for (let i = 0; i < nicknamesLength; i++) {
            const regExpBase = `${allNicknamesCharacter[i].toLocaleLowerCase()}`;
            const regExpNickname = new RegExp(regExpBase);
            console.log(regExpNickname);
            for (let j = 1; j < namesSendersLength; j++) {
                console.log(regExpNickname.test(namesSenders[j].toLocaleLowerCase()));
                if (regExpNickname.test(namesSenders[j].toLocaleLowerCase()))
                    characterCaptured.captured = true;
            }
        }
        if (characterCaptured.captured)
            return characterCaptured;
        // verify names
        for (let i = 0; i < namesWaifuLength; i++) {
            const regExpBase = `${allNamesCharacter[i].toLocaleLowerCase()}`;
            const regExpName = new RegExp(regExpBase);
            console.log(regExpName);
            for (let j = 1; j < namesSendersLength; j++) {
                console.log(regExpName.test(namesSenders[j].toLocaleLowerCase()));
                if (regExpName.test(namesSenders[j].toLocaleLowerCase()))
                    characterCaptured.captured = true;
            }
        }
        return characterCaptured;
    }
    catch (error) {
        global.logger.error(error);
        throw error;
    }
});
const searchRandomWaifu = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allWaifusId = yield Waifus.findAll({
            attributes: ["id"],
            where: { eventId: 1 },
        });
        const ramdomPosition = utilsController_1.default.getRamdomIntegerNumber(0, allWaifusId.length);
        const waifuIdSelected = allWaifusId[ramdomPosition];
        const waifu = yield Waifus.findByPk(waifuIdSelected.id);
        if (!waifu)
            throw "waifu not found";
        return waifu;
    }
    catch (error) {
        global.logger.error(error);
        throw error;
    }
});
const addWaifuToUserList = (waifuId, userId, t) => __awaiter(void 0, void 0, void 0, function* () {
    const trans = t !== null && t !== void 0 ? t : (yield models_1.default.sequelize.transaction());
    try {
        const waifuList = yield WaifuLists.findOne({
            where: { waifuId, userId },
        });
        if (waifuList) {
            waifuList.update({ quantity: waifuList.quantity + 1, updatedAt: new Date() }, { transaction: trans });
        }
        else {
            yield WaifuLists.create({
                waifuId,
                userId,
                createdAt: new Date(),
                updatedAt: new Date(),
            }, { transaction: trans });
        }
        const result = yield userController_1.default.addExpToUser(userId, waifuId, trans);
        const user = yield userController_1.default.getUserById(userId);
        const waifu = yield getWaifuById(waifuId);
        const franchise = yield waifu.getFranchise();
        const initialMessage = i18n_1.default.__("waifuProtecc", user.nickname, `${waifu.name}${waifu.nickname ? " - (" + waifu.nickname + ")" : ""}`, `${franchise.name}${franchise.nickname ? " - (" + franchise.nickname + ")" : ""}`);
        const messageExpWon = i18n_1.default.__n("waifuExpWon", result.expWon);
        const messageLevelUp = result.levelUp
            ? i18n_1.default.__n("levelUp", result.level)
            : "";
        const messageNewFavoritePage = result.levelUp && result.level % 5 == 0
            ? i18n_1.default.__n("wonFavoritePage", result.level / 5)
            : "";
        const waifuType = _getWaifuTypeNumberToMessage(waifu.waifuTypeId);
        const messageWaifuType = i18n_1.default.__n("waifuProteccType", waifuType);
        const waifuAge = _getWaifuAgeNumberToMessage(waifu.age);
        const messageWaifuAge = i18n_1.default.__n("waifuProteccAge", waifuAge);
        const messageReturn = `${initialMessage}\n${messageExpWon} ${messageLevelUp} ${messageNewFavoritePage}\n${messageWaifuType}\n${messageWaifuAge}`;
        if (!t)
            yield trans.commit();
        return {
            message: messageReturn,
            sendButtonReport: waifu.age > 0 && waifu.age < 18,
        };
    }
    catch (error) {
        if (!t)
            yield trans.rollback();
        global.logger.error(error);
        throw error;
    }
});
exports.default = {
    getWaifuById,
    proteccWaifuValidator,
    searchRandomWaifu,
    addWaifuToUserList,
};
