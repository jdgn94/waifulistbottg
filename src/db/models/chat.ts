import { CreationOptional, DataTypes, Model, Optional } from "sequelize";

import db from "../config";

export type ChatAttributes = {
  id: number;
  chatIdTg: string;
  messageLimit: number;
  messageQuantity: number;
  language: "en" | "es";
  createdAt: Date;
  updatedAt: Date;
};

type ChatCreationAttributes = Optional<ChatAttributes, "id">;

class Chat extends Model<ChatAttributes, ChatCreationAttributes> {
  declare id: CreationOptional<number>;
  declare chatIdTg: string;
  declare messageLimit: number;
  declare messageQuantity: number;
  declare language: "en" | "es";
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Chat.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    chatIdTg: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    messageLimit: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 100,
    },
    messageQuantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    },
    language: {
      type: DataTypes.STRING,
      defaultValue: "en",
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
    tableName: "chats",
    sequelize: db,
  }
);

export default Chat;
