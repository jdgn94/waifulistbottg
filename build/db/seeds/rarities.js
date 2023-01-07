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
exports.insertRarity = void 0;
const waifuRarity_1 = __importDefault(require("../models/waifuRarity"));
const rarities = [
    {
        id: 1,
        name: "commoun",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        name: "epic",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 3,
        name: "legendary",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
const insertRarity = (t) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let raritiesToInsert = [];
        yield Promise.all(rarities.map((rarity) => __awaiter(void 0, void 0, void 0, function* () {
            const rarityInserted = yield waifuRarity_1.default.findByPk(rarity.id);
            if (!rarityInserted) {
                raritiesToInsert.push(rarity);
            }
        })));
        yield waifuRarity_1.default.bulkCreate(raritiesToInsert, { transaction: t });
        global.logger.info(`Inserted rarities ${raritiesToInsert.length} news`);
        return;
    }
    catch (error) {
        global.logger.error(error);
        throw new Error("Rarities no inserted");
    }
});
exports.insertRarity = insertRarity;
