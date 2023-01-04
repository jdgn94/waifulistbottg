import { CreationOptional, DataTypes, Model, Optional } from "sequelize";

import db from "../config";

export type WaifuAttributes = {
  id: number;
  name: string;
  nickname?: string | null;
  age: number;
  servant: boolean;
  waifuTypeId: number;
  franchiseId: number;
  publicId: string;
  imageUrl: string;
  favPublicId?: string | null;
  favImageUrl?: string | null;
  rarityId?: number;
  basePower?: number;
  eventId?: number;
  createdAt: Date;
  updatedAt: Date;
};

export type WaifuCreationAttributes = Optional<
  WaifuAttributes,
  "id" &
    "nickname" &
    "servant" &
    "favPublicId" &
    "favImageUrl" &
    "rarityId" &
    "basePower" &
    "eventId" &
    "cratedAt" &
    "updatedAt"
>;

class Waifu extends Model<WaifuAttributes, WaifuCreationAttributes> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare nickname: CreationOptional<string | null>;
  declare age: number;
  declare servant: CreationOptional<boolean>;
  declare waifuTypeId: number;
  declare franchiseId: number;
  declare publicId: string;
  declare imageUrl: string;
  declare favPublicId: CreationOptional<string | null>;
  declare favImageUrl: CreationOptional<string | null>;
  declare rarityId: CreationOptional<number>;
  declare basePower: CreationOptional<number>;
  declare eventId: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Waifu.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 18,
    },
    servant: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    waifuTypeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "waifuTypes",
        key: "id",
      },
    },
    franchiseId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "franchises",
        key: "id",
      },
    },
    publicId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    favPublicId: {
      type: DataTypes.STRING,
    },
    favImageUrl: {
      type: DataTypes.STRING,
    },
    rarityId: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 1,
      references: {
        model: "waifuRarities",
        key: "id",
      },
    },
    basePower: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 300,
    },
    eventId: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 1,
      references: {
        model: "events",
        key: "id",
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "waifus",
    sequelize: db,
  }
);

export default Waifu;
