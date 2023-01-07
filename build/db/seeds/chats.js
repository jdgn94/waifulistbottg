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
exports.insertChats = void 0;
const chat_1 = __importDefault(require("../models/chat"));
const chats = [
    {
        id: 2,
        chatIdTg: "-416904585",
        messageLimit: 100,
        messageQuantity: 17,
        language: "en",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 3,
        chatIdTg: "-1001476406435",
        messageLimit: 100,
        messageQuantity: 31,
        language: "en",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
const insertChats = (t) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let chatsToInsert = [];
        yield Promise.all(chats.map((chat) => __awaiter(void 0, void 0, void 0, function* () {
            const chatInserted = yield chat_1.default.findByPk(chat.id);
            if (!chatInserted) {
                chatsToInsert.push(chat);
            }
        })));
        yield chat_1.default.bulkCreate(chatsToInsert, { transaction: t });
        global.logger.debug(`Inserted chats ${chatsToInsert.length} news`);
        return;
    }
    catch (error) {
        global.logger.error(error);
        throw error;
    }
});
exports.insertChats = insertChats;
