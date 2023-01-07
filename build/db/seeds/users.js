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
exports.insertUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const users = [
    {
        id: 2,
        userIdTg: 375582539,
        nickname: "jdgn94",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 3,
        userIdTg: 671602096,
        nickname: "KrisDFC",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 4,
        userIdTg: 905834040,
        nickname: "RicardoARiosP",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 5,
        userIdTg: 941573181,
        nickname: "Juan Daniel",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
const insertUsers = (t) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let usersToInsert = [];
        yield Promise.all(users.map((user) => __awaiter(void 0, void 0, void 0, function* () {
            const userInserted = yield user_1.default.findByPk(user.id);
            if (!userInserted) {
                usersToInsert.push(user);
            }
        })));
        yield user_1.default.bulkCreate(usersToInsert, { transaction: t });
        global.logger.info(`Inserted users ${usersToInsert.length} news`);
        return;
    }
    catch (error) {
        global.logger.error(error);
        throw error;
    }
});
exports.insertUsers = insertUsers;
