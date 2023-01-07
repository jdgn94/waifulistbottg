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
const api_1 = __importDefault(require("./api"));
const bot_1 = __importDefault(require("./bot"));
const models_1 = __importDefault(require("./db/models"));
const seeds_1 = __importDefault(require("./db/seeds"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seeds = new seeds_1.default();
        const port = api_1.default.get("port");
        api_1.default.listen(port);
        global.logger.info(`server on port ${port}`);
        models_1.default.sequelize.authenticate();
        global.logger.info(`database connected`);
        yield models_1.default.sequelize.sync({ force: false, alter: false });
        global.logger.info(`database sync`);
        bot_1.default.launch();
        global.logger.info(`bot launch`);
        yield seeds.run();
    }
    catch (error) {
        console.error(error);
        global.logger.error(error);
    }
});
main();
