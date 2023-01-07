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
exports.insertWaifuTypes = void 0;
const waifuType_1 = __importDefault(require("../models/waifuType"));
const waifyTypes = [
    {
        id: 1,
        name: "loli",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        name: "normal",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 3,
        name: "milf",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 4,
        name: "superMilf",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 5,
        name: "superLoli",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 6,
        name: "gothic",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 7,
        name: "loliBusty",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 8,
        name: "busty",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
const insertWaifuTypes = (t) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let waifuTypesToInsert = [];
        yield Promise.all(waifyTypes.map((waifuType) => __awaiter(void 0, void 0, void 0, function* () {
            const waifuTypeInserted = yield waifuType_1.default.findByPk(waifuType.id);
            if (!waifuTypeInserted) {
                waifuTypesToInsert.push(waifuType);
            }
        })));
        yield waifuType_1.default.bulkCreate(waifuTypesToInsert, { transaction: t });
        global.logger.info(`Inserted waifu types ${waifuTypesToInsert.length} news`);
        return;
    }
    catch (error) {
        global.logger.error(error);
        throw error;
    }
});
exports.insertWaifuTypes = insertWaifuTypes;
