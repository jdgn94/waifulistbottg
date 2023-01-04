import { CreationOptional, DataTypes, Model, Optional } from "sequelize";

import db from "../config";

export type TradeAttributes = {
  id: number;
  messageId: string;
  waifuEmitterId: number;
  waifuReceptorId: number;
  chatId: number;
  complete: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type TradeCreationAttributes = Optional<TradeAttributes, "id">;

class Trade extends Model<TradeAttributes, TradeCreationAttributes> {
  declare id: CreationOptional<number>;
  declare messageId: string;
  declare waifuEmitterId: number;
  declare waifuReceptorId: number;
  declare chatId: number;
  declare complete: boolean;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Trade.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    messageId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    waifuEmitterId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "waifuLists",
        key: "id",
      },
    },
    waifuReceptorId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "waifuLists",
        key: "id",
      },
    },
    chatId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "chats",
        key: "id",
      },
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    tableName: "trades",
    sequelize: db,
  }
);

export default Trade;
