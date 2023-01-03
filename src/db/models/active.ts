import {
  CreationOptional,
  DataTypes,
  Model,
  Optional,
  literal,
} from "sequelize";
// import { Fn } from "sequelize/types/utils";

import db from "../config";

export type ActiveAttributes = {
  id: number;
  chatId: number;
  waifuId: number;
  attempts: number;
  createdAt: Date;
  updatedAt: Date;
};

type ActiveCreationAttributes = Optional<ActiveAttributes, "id">;

class Active extends Model<ActiveAttributes, ActiveCreationAttributes> {
  declare id: CreationOptional<number>;
  declare chatId: number;
  declare waifuId: number;
  declare attempts: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Active.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    chatId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true,
      references: {
        model: "chats",
        key: "id",
      },
    },
    waifuId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true,
      references: {
        model: "waifus",
        key: "id",
      },
    },
    attempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    tableName: "actives",
    sequelize: db,
  }
);

export default Active;
