"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.stream = void 0;
const winston_1 = __importDefault(require("winston"));
const logFormat = winston_1.default.format.printf((log) => {
    const date = new Date().toLocaleString();
    return `${date} | ${log.level} | ${JSON.stringify(log.message)}`;
});
const options = {
    console: {
        level: "debug",
        format: winston_1.default.format.combine(winston_1.default.format.colorize(), logFormat),
        handleExeption: true,
        colorize: true,
        timestamp: true,
        silent: false,
    },
};
const logger = winston_1.default.createLogger({ exitOnError: false });
exports.logger = logger;
logger.add(new winston_1.default.transports.Console(options.console));
const stream = {
    write: function (message) {
        logger.info(message);
    },
};
exports.stream = stream;
