"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
class Chat extends sequelize_1.Model {
}
Chat.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    chatIdTg: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    messageLimit: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 100,
    },
    messageQuantity: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
    },
    language: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "en",
    },
    createdAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    tableName: "chats",
    sequelize: config_1.default,
});
exports.default = Chat;