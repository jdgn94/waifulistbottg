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
exports.createEvents = void 0;
const event_1 = __importDefault(require("../models/event"));
const events = [
    {
        id: 1,
        name: "none",
        icon: "",
        initEvent: "",
        finishEvent: "",
        imageUrl: "",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        name: "birthday",
        icon: "🎂",
        initEvent: "04-15",
        finishEvent: "04-30",
        imageUrl: "",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 3,
        name: "christmas",
        icon: "🎄",
        initEvent: "12-20",
        finishEvent: "01-05",
        imageUrl: "",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 4,
        name: "halloween",
        icon: "🎃",
        initEvent: "10-20",
        finishEvent: "11-05",
        imageUrl: "",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 5,
        name: "summer",
        icon: "🌴",
        initEvent: "08-01",
        finishEvent: "08-15",
        imageUrl: "",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 6,
        name: "valentine",
        icon: "💘",
        initEvent: "02-01",
        finishEvent: "02-15",
        imageUrl: "",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
const createEvents = (t) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let eventsToInsert = [];
        yield Promise.all(events.map((event) => __awaiter(void 0, void 0, void 0, function* () {
            const eventInsert = yield event_1.default.findByPk(event.id);
            if (!eventInsert) {
                eventsToInsert.push(event);
            }
        })));
        yield event_1.default.bulkCreate(eventsToInsert, { transaction: t });
        global.logger.info(`Inserted events ${eventsToInsert.length} news`);
        return;
    }
    catch (error) { }
});
exports.createEvents = createEvents;
