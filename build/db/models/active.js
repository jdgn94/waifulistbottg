"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
class Active extends sequelize_1.Model {
}
Active.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    chatId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
        references: {
            model: "chats",
            key: "id",
        },
    },
    waifuId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
        references: {
            model: "waifus",
            key: "id",
        },
    },
    attempts: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 10,
        allowNull: false,
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
    tableName: "actives",
    sequelize: config_1.default,
});
exports.default = Active;
