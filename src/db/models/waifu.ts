import {
  CreationOptional,
  DataTypes,
  Model,
  Optional,
  literal,
} from "sequelize";
// import { Fn } from "sequelize/types/utils";

import db from "../config";

export type WaifuAttributes = {
  id: number;
  name: string;
  nickname: string | null;
  age: number;
  servant: boolean;
  waifuTypeId: number;
  franchiseId: number;
  publicId: string;
  imageUrl: string;
  favImageUrl: string | null;
  rarityId: number;
  createdAt: Date;
  updatedAt: Date;
};

type WaifuCreationAttributes = Optional<WaifuAttributes, "id">;

class Waifu extends Model<WaifuAttributes, WaifuCreationAttributes> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare nickname: string | null;
  declare age: number;
  declare servant: boolean;
  declare waifuTypeId: number;
  declare franchiseId: number;
  declare publicId: string;
  declare imageUrl: string;
  declare favImageUrl: string | null;
  declare rarityId: number;
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
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: literal("CURRENT_TIMESTAMP()"),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: literal(
        "CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()"
      ),
    },
  },
  {
    tableName: "waifus",
    sequelize: db,
  }
);

export default Waifu;
