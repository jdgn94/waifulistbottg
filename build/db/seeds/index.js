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
const index_1 = __importDefault(require("../models/index"));
const rarities_1 = require("./rarities");
const events_1 = require("./events");
const waifuTypes_1 = require("./waifuTypes");
const franchises_1 = require("./franchises");
const waifus_1 = require("./waifus");
const users_1 = require("./users");
const chats_1 = require("./chats");
const userInfos_1 = require("./userInfos");
const waifuLists_1 = require("./waifuLists");
const waifuFaboriteLists_1 = require("./waifuFaboriteLists");
class Seed {
    constructor() { }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const t = yield index_1.default.sequelize.transaction();
            try {
                yield (0, rarities_1.insertRarity)(t);
                yield (0, events_1.createEvents)(t);
                yield (0, waifuTypes_1.insertWaifuTypes)(t);
                yield (0, franchises_1.insertFranchises)(t);
                yield (0, waifus_1.insertWaifus)(t);
                yield (0, users_1.insertUsers)(t);
                yield (0, chats_1.insertChats)(t);
                yield (0, userInfos_1.insertUserInfos)(t);
                yield (0, waifuLists_1.insertWaifuLists)(t);
                yield (0, waifuFaboriteLists_1.insertWaifuFavoriteLists)(t);
                yield t.commit();
                global.logger.info("seeds inserted");
            }
            catch (error) {
                yield t.rollback();
                console.error(error);
                global.logger.error(error);
            }
            return;
        });
    }
}
exports.default = Seed;
