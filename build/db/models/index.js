"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const franchise_1 = __importDefault(require("./franchise"));
const event_1 = __importDefault(require("./event"));
const waifuType_1 = __importDefault(require("./waifuType"));
const waifuRarity_1 = __importDefault(require("./waifuRarity"));
const waifu_1 = __importDefault(require("./waifu"));
const chat_1 = __importDefault(require("./chat"));
const user_1 = __importDefault(require("./user"));
const waifuList_1 = __importDefault(require("./waifuList"));
const waifuFavoriteList_1 = __importDefault(require("./waifuFavoriteList"));
const active_1 = __importDefault(require("./active"));
const trade_1 = __importDefault(require("./trade"));
const userInfo_1 = __importDefault(require("./userInfo"));
const specialImage_1 = __importDefault(require("./specialImage"));
const specialImageWaifu_1 = __importDefault(require("./specialImageWaifu"));
const waifuSpecialList_1 = __importDefault(require("./waifuSpecialList"));
const bet_1 = __importDefault(require("./bet"));
const config_1 = __importDefault(require("../config"));
const db = {
    sequelize: config_1.default,
    Sequelize: sequelize_1.default,
    Franchises: franchise_1.default,
    Events: event_1.default,
    WaifuTypes: waifuType_1.default,
    WaifuRarities: waifuRarity_1.default,
    Waifus: waifu_1.default,
    Chats: chat_1.default,
    Users: user_1.default,
    WaifuLists: waifuList_1.default,
    WaifuFavoriteLists: waifuFavoriteList_1.default,
    Actives: active_1.default,
    Trades: trade_1.default,
    UserInfos: userInfo_1.default,
    SpecialImages: specialImage_1.default,
    SpecialImagesWaifus: specialImageWaifu_1.default,
    WaifuSpecialLists: waifuSpecialList_1.default,
    Bets: bet_1.default,
};
exports.default = db;
