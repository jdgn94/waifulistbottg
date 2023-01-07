"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
class Event extends sequelize_1.Model {
}
Event.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    icon: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    initEvent: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    finishEvent: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING,
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
    tableName: "events",
    sequelize: config_1.default,
});
exports.default = Event;
