"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
process.env.NODE_ENV !== "production" && dotenv_1.default.config();
const development = {
    username: (_a = process.env.USERNAME) !== null && _a !== void 0 ? _a : "root",
    password: (_b = process.env.PASSWORD) !== null && _b !== void 0 ? _b : "",
    database: (_c = process.env.DATABASE) !== null && _c !== void 0 ? _c : "dev",
    host: (_d = process.env.HOST) !== null && _d !== void 0 ? _d : "127.0.0.1",
    port: (_e = Number(process.env.PORT_DB)) !== null && _e !== void 0 ? _e : 3306,
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeSeeds",
    dialect: ((_f = process.env.DIALECT) !== null && _f !== void 0 ? _f : "mysql"),
    logging: process.env.NODE_ENV == "development",
    timezone: "-04:00",
    dialectOptions: {
        connectTimeout: 60000,
    },
    pool: {
        max: 10,
        min: 0,
        idle: 20000,
        acquire: 20000,
    },
};
const db = new sequelize_1.Sequelize(development.database, development.username, development.password, {
    host: development.host,
    port: development.port,
    dialect: development.dialect,
    timezone: development.timezone,
    pool: development.pool,
    logging: development.logging,
    dialectOptions: development.dialectOptions,
});
exports.default = db;
