"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const waifuType_1 = __importDefault(require("./waifuType"));
const franchise_1 = __importDefault(require("./franchise"));
const event_1 = __importDefault(require("./event"));
const waifuRarity_1 = __importDefault(require("./waifuRarity"));
class Waifu extends sequelize_1.Model {
}
Waifu.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    nickname: {
        type: sequelize_1.DataTypes.STRING,
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        defaultValue: 18,
    },
    servant: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    waifuTypeId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: "waifuTypes",
            key: "id",
        },
    },
    franchiseId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: "franchises",
            key: "id",
        },
    },
    publicId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    favPublicId: {
        type: sequelize_1.DataTypes.STRING,
    },
    favImageUrl: {
        type: sequelize_1.DataTypes.STRING,
    },
    rarityId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        defaultValue: 1,
        references: {
            model: "waifuRarities",
            key: "id",
        },
    },
    basePower: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        defaultValue: 300,
    },
    eventId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        defaultValue: 1,
        references: {
            model: "events",
            key: "id",
        },
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
    tableName: "waifus",
    sequelize: config_1.default,
});
Waifu.hasOne(waifuType_1.default, {
    sourceKey: "waifuTypeId",
    foreignKey: "id",
    as: "waifuType",
});
Waifu.hasOne(franchise_1.default, {
    sourceKey: "franchiseId",
    foreignKey: "id",
    as: "franchise",
});
Waifu.hasOne(event_1.default, {
    sourceKey: "eventId",
    foreignKey: "id",
    as: "event",
});
Waifu.hasOne(waifuRarity_1.default, {
    sourceKey: "rarityId",
    foreignKey: "id",
    as: "rarity",
});
exports.default = Waifu;
