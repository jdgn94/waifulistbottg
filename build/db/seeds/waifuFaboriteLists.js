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
exports.insertWaifuFavoriteLists = void 0;
const waifuFavoriteList_1 = __importDefault(require("../models/waifuFavoriteList"));
const waifuFavoriteLists = [
    {
        waifuListId: 127,
        position: 4,
        createdAt: new Date("2020-11-15 22:54:12"),
        updatedAt: new Date("2020-12-25 04:18:42"),
    },
    {
        waifuListId: 55,
        position: 13,
        createdAt: new Date("2020-11-15 22:54:32"),
        updatedAt: new Date("2021-05-15 18:53:56"),
    },
    {
        waifuListId: 8,
        position: 6,
        createdAt: new Date("2020-11-15 22:55:08"),
        updatedAt: new Date("2021-04-05 22:43:47"),
    },
    {
        waifuListId: 29,
        position: 23,
        createdAt: new Date("2020-11-15 22:56:26"),
        updatedAt: new Date("2021-05-15 18:53:56"),
    },
    {
        waifuListId: 132,
        position: 18,
        createdAt: new Date("2020-11-15 22:56:55"),
        updatedAt: new Date("2021-05-15 18:53:56"),
    },
    {
        waifuListId: 117,
        position: 14,
        createdAt: new Date("2020-11-15 22:57:25"),
        updatedAt: new Date("2021-05-15 18:53:56"),
    },
    {
        waifuListId: 104,
        position: 20,
        createdAt: new Date("2020-11-15 23:00:14"),
        updatedAt: new Date("2021-05-15 18:53:56"),
    },
    {
        waifuListId: 21,
        position: 30,
        createdAt: new Date("2020-11-15 23:00:39"),
        updatedAt: new Date("2021-05-15 18:53:56"),
    },
    {
        waifuListId: 34,
        position: 12,
        createdAt: new Date("2020-11-15 23:02:46"),
        updatedAt: new Date("2021-05-15 18:53:57"),
    },
    {
        waifuListId: 23,
        position: 22,
        createdAt: new Date("2020-11-15 23:06:19"),
        updatedAt: new Date("2021-05-15 18:53:56"),
    },
    {
        waifuListId: 264,
        position: 14,
        createdAt: new Date("2020-11-18 01:57:25"),
        updatedAt: new Date("2021-11-12 19:32:36"),
    },
    {
        waifuListId: 169,
        position: 9,
        createdAt: new Date("2020-11-18 01:57:35"),
        updatedAt: new Date("2021-11-12 19:32:36"),
    },
    {
        waifuListId: 273,
        position: 2,
        createdAt: new Date("2020-11-19 16:56:06"),
        updatedAt: new Date("2020-12-25 02:02:22"),
    },
    {
        waifuListId: 303,
        position: 7,
        createdAt: new Date("2020-11-22 05:14:36"),
        updatedAt: new Date("2021-04-05 22:43:47"),
    },
    {
        waifuListId: 308,
        position: 10,
        createdAt: new Date("2020-11-22 23:14:28"),
        updatedAt: new Date("2021-11-12 19:32:36"),
    },
    {
        waifuListId: 224,
        position: 50,
        createdAt: new Date("2020-12-01 21:17:28"),
        updatedAt: new Date("2021-05-15 18:53:57"),
    },
    {
        waifuListId: 102,
        position: 42,
        createdAt: new Date("2020-12-01 21:18:12"),
        updatedAt: new Date("2021-05-15 18:53:57"),
    },
    {
        waifuListId: 261,
        position: 52,
        createdAt: new Date("2020-12-01 21:18:35"),
        updatedAt: new Date("2021-05-15 18:53:57"),
    },
    {
        waifuListId: 96,
        position: 51,
        createdAt: new Date("2020-12-01 21:19:05"),
        updatedAt: new Date("2021-05-15 18:53:57"),
    },
    {
        waifuListId: 116,
        position: 35,
        createdAt: new Date("2020-12-01 21:19:47"),
        updatedAt: new Date("2021-05-15 18:53:56"),
    },
    {
        waifuListId: 244,
        position: 36,
        createdAt: new Date("2020-12-01 21:20:26"),
        updatedAt: new Date("2021-05-15 18:53:57"),
    },
    {
        waifuListId: 156,
        position: 40,
        createdAt: new Date("2020-12-01 21:22:07"),
        updatedAt: new Date("2021-05-15 18:53:57"),
    },
    {
        waifuListId: 122,
        position: 41,
        createdAt: new Date("2020-12-01 21:24:13"),
        updatedAt: new Date("2021-05-15 18:53:57"),
    },
    {
        waifuListId: 335,
        position: 29,
        createdAt: new Date("2020-12-01 21:24:51"),
        updatedAt: new Date("2021-05-15 18:53:56"),
    },
    {
        waifuListId: 248,
        position: 38,
        createdAt: new Date("2020-12-01 21:25:17"),
        updatedAt: new Date("2021-05-15 18:53:57"),
    },
    {
        waifuListId: 299,
        position: 39,
        createdAt: new Date("2020-12-01 21:25:54"),
        updatedAt: new Date("2021-05-15 18:53:57"),
    },
    {
        waifuListId: 221,
        position: 37,
        createdAt: new Date("2020-12-01 21:26:43"),
        updatedAt: new Date("2021-05-15 18:53:57"),
    },
    {
        waifuListId: 237,
        position: 48,
        createdAt: new Date("2020-12-01 21:33:48"),
        updatedAt: new Date("2021-05-15 18:53:57"),
    },
    {
        waifuListId: 298,
        position: 45,
        createdAt: new Date("2020-12-01 21:36:51"),
        updatedAt: new Date("2021-05-15 18:53:57"),
    },
    {
        waifuListId: 38,
        position: 49,
        createdAt: new Date("2020-12-01 21:40:34"),
        updatedAt: new Date("2021-05-15 18:53:57"),
    },
    {
        waifuListId: 353,
        position: 44,
        createdAt: new Date("2020-12-03 22:08:26"),
        updatedAt: new Date("2021-05-15 18:53:57"),
    },
    {
        waifuListId: 367,
        position: 43,
        createdAt: new Date("2020-12-07 17:08:15"),
        updatedAt: new Date("2021-05-15 18:53:57"),
    },
    {
        waifuListId: 366,
        position: 47,
        createdAt: new Date("2020-12-07 17:09:09"),
        updatedAt: new Date("2021-05-15 18:53:57"),
    },
    {
        waifuListId: 39,
        position: 46,
        createdAt: new Date("2020-12-07 17:10:36"),
        updatedAt: new Date("2021-05-15 18:53:57"),
    },
    {
        waifuListId: 392,
        position: 12,
        createdAt: new Date("2020-12-12 18:38:11"),
        updatedAt: new Date("2021-11-12 19:32:36"),
    },
    {
        waifuListId: 396,
        position: 8,
        createdAt: new Date("2020-12-12 22:59:51"),
        updatedAt: new Date("2021-04-05 22:43:47"),
    },
    {
        waifuListId: 400,
        position: 34,
        createdAt: new Date("2020-12-13 21:03:33"),
        updatedAt: new Date("2021-05-15 18:53:56"),
    },
    {
        waifuListId: 440,
        position: 1,
        createdAt: new Date("2020-12-23 21:26:58"),
        updatedAt: new Date("2020-12-23 21:26:58"),
    },
    {
        waifuListId: 456,
        position: 31,
        createdAt: new Date("2020-12-25 00:50:37"),
        updatedAt: new Date("2021-05-15 18:53:56"),
    },
    {
        waifuListId: 460,
        position: 1,
        createdAt: new Date("2020-12-25 01:24:15"),
        updatedAt: new Date("2020-12-25 01:24:15"),
    },
    {
        waifuListId: 459,
        position: 16,
        createdAt: new Date("2020-12-25 02:51:43"),
        updatedAt: new Date("2021-05-15 18:53:56"),
    },
    {
        waifuListId: 458,
        position: 2,
        createdAt: new Date("2020-12-25 02:52:14"),
        updatedAt: new Date("2020-12-25 02:52:14"),
    },
    {
        waifuListId: 464,
        position: 7,
        createdAt: new Date("2020-12-25 03:26:28"),
        updatedAt: new Date("2021-07-22 17:56:02"),
    },
    {
        waifuListId: 466,
        position: 3,
        createdAt: new Date("2020-12-25 04:18:42"),
        updatedAt: new Date("2020-12-25 04:18:42"),
    },
    {
        waifuListId: 470,
        position: 15,
        createdAt: new Date("2020-12-25 04:18:58"),
        updatedAt: new Date("2021-05-15 18:53:56"),
    },
    {
        waifuListId: 481,
        position: 17,
        createdAt: new Date("2020-12-25 21:00:59"),
        updatedAt: new Date("2021-05-15 18:53:56"),
    },
    {
        waifuListId: 480,
        position: 33,
        createdAt: new Date("2020-12-25 21:02:35"),
        updatedAt: new Date("2021-05-15 18:53:56"),
    },
    {
        waifuListId: 504,
        position: 27,
        createdAt: new Date("2021-01-05 00:12:08"),
        updatedAt: new Date("2021-05-15 18:53:56"),
    },
    {
        waifuListId: 482,
        position: 28,
        createdAt: new Date("2021-01-05 00:12:25"),
        updatedAt: new Date("2021-05-15 18:53:56"),
    },
    {
        waifuListId: 507,
        position: 13,
        createdAt: new Date("2021-01-05 00:12:26"),
        updatedAt: new Date("2021-11-12 19:32:36"),
    },
    {
        waifuListId: 521,
        position: 6,
        createdAt: new Date("2021-01-07 00:15:06"),
        updatedAt: new Date("2021-07-22 17:56:02"),
    },
    {
        waifuListId: 526,
        position: 32,
        createdAt: new Date("2021-01-07 01:43:35"),
        updatedAt: new Date("2021-05-15 18:53:56"),
    },
    {
        waifuListId: 239,
        position: 53,
        createdAt: new Date("2021-01-07 01:49:40"),
        updatedAt: new Date("2021-05-15 18:53:57"),
    },
    {
        waifuListId: 527,
        position: 21,
        createdAt: new Date("2021-01-07 21:42:06"),
        updatedAt: new Date("2021-05-15 18:53:56"),
    },
    {
        waifuListId: 535,
        position: 19,
        createdAt: new Date("2021-01-08 03:01:06"),
        updatedAt: new Date("2021-05-15 18:53:56"),
    },
    {
        waifuListId: 542,
        position: 4,
        createdAt: new Date("2021-01-10 23:26:05"),
        updatedAt: new Date("2021-07-22 17:56:02"),
    },
    {
        waifuListId: 546,
        position: 3,
        createdAt: new Date("2021-01-11 12:55:21"),
        updatedAt: new Date("2021-01-11 12:55:21"),
    },
    {
        waifuListId: 624,
        position: 11,
        createdAt: new Date("2021-02-25 04:46:43"),
        updatedAt: new Date("2021-11-12 19:32:36"),
    },
    {
        waifuListId: 671,
        position: 9,
        createdAt: new Date("2021-03-25 17:09:30"),
        updatedAt: new Date("2021-04-05 22:43:47"),
    },
    {
        waifuListId: 678,
        position: 5,
        createdAt: new Date("2021-04-05 22:43:47"),
        updatedAt: new Date("2021-04-05 22:43:47"),
    },
    {
        waifuListId: 679,
        position: 10,
        createdAt: new Date("2021-04-05 22:44:08"),
        updatedAt: new Date("2021-04-05 22:44:08"),
    },
    {
        waifuListId: 705,
        position: 25,
        createdAt: new Date("2021-04-14 13:26:09"),
        updatedAt: new Date("2021-05-15 18:53:56"),
    },
    {
        waifuListId: 683,
        position: 24,
        createdAt: new Date("2021-04-14 13:34:59"),
        updatedAt: new Date("2021-05-15 18:53:56"),
    },
    {
        waifuListId: 744,
        position: 26,
        createdAt: new Date("2021-05-05 13:29:33"),
        updatedAt: new Date("2021-05-15 18:53:56"),
    },
    {
        waifuListId: 756,
        position: 5,
        createdAt: new Date("2021-05-09 19:03:02"),
        updatedAt: new Date("2021-07-22 17:56:02"),
    },
    {
        waifuListId: 765,
        position: 11,
        createdAt: new Date("2021-05-15 18:53:56"),
        updatedAt: new Date("2021-05-15 18:53:56"),
    },
    {
        waifuListId: 984,
        position: 8,
        createdAt: new Date("2021-11-12 19:32:36"),
        updatedAt: new Date("2021-11-12 19:32:36"),
    },
];
const insertWaifuFavoriteLists = (t) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let waifuFavoriteListsToInsert = [];
        yield Promise.all(waifuFavoriteLists.map((waifuFavoriteList) => __awaiter(void 0, void 0, void 0, function* () {
            const waifuFavoriteListInserted = yield waifuFavoriteList_1.default.findOne({
                where: { waifuListId: waifuFavoriteList.waifuListId },
            });
            if (!waifuFavoriteListInserted) {
                waifuFavoriteListsToInsert.push(waifuFavoriteList);
            }
        })));
        yield waifuFavoriteList_1.default.bulkCreate(waifuFavoriteListsToInsert, {
            transaction: t,
        });
        global.logger.info(`Inserted waifu favorite lists ${waifuFavoriteListsToInsert.length} news`);
        return;
    }
    catch (error) {
        global.logger.error(error);
        throw error;
    }
});
exports.insertWaifuFavoriteLists = insertWaifuFavoriteLists;
