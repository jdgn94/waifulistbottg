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
exports.insertUserInfos = void 0;
const userInfo_1 = __importDefault(require("../models/userInfo"));
const userInfos = [
    {
        id: 1,
        userId: 2,
        level: 41,
        points: 500,
        exp: 128,
        limitExp: 300,
        expMulti: 1,
        expMultiExpire: null,
        favoritePages: 1,
        favoritePagePurchases: 0,
        totalBets: 23,
        totalBetsWon: 3,
        totalBetsLost: 20,
        totalBetsPoints: 77,
        totalBetsPointsWon: 210,
        jail: false,
        jailExpire: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        userId: 3,
        level: 44,
        points: 450,
        exp: 60,
        limitExp: 300,
        expMulti: 1,
        expMultiExpire: null,
        favoritePages: 1,
        favoritePagePurchases: 0,
        totalBets: 38,
        totalBetsWon: 2,
        totalBetsLost: 36,
        totalBetsPoints: 102,
        totalBetsPointsWon: 130,
        jail: false,
        jailExpire: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 3,
        userId: 4,
        level: 18,
        points: 250,
        exp: 91,
        limitExp: 175,
        expMulti: 1,
        expMultiExpire: null,
        favoritePages: 1,
        favoritePagePurchases: 0,
        totalBets: 17,
        totalBetsWon: 3,
        totalBetsLost: 14,
        totalBetsPoints: 93,
        totalBetsPointsWon: 160,
        jail: false,
        jailExpire: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 4,
        userId: 5,
        level: 1,
        points: 20,
        exp: 61,
        limitExp: 100,
        expMulti: 1,
        expMultiExpire: null,
        favoritePages: 1,
        favoritePagePurchases: 0,
        totalBets: 0,
        totalBetsWon: 0,
        totalBetsLost: 0,
        totalBetsPoints: 0,
        totalBetsPointsWon: 0,
        jail: false,
        jailExpire: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
const insertUserInfos = (t) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userInfosToInsert = [];
        yield Promise.all(userInfos.map((userInfo) => __awaiter(void 0, void 0, void 0, function* () {
            const userInfoInserted = yield userInfo_1.default.findByPk(userInfo.id);
            if (!userInfoInserted) {
                userInfosToInsert.push(userInfo);
            }
        })));
        yield userInfo_1.default.bulkCreate(userInfosToInsert, { transaction: t });
        global.logger.info(`Inserted user infos ${userInfosToInsert.length} news`);
        return;
    }
    catch (error) {
        global.logger.error(error);
        throw error;
    }
});
exports.insertUserInfos = insertUserInfos;
