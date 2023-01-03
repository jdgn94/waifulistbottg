import {
  CreationOptional,
  DataTypes,
  Model,
  Optional,
  literal,
} from "sequelize";
// import { Fn } from "sequelize/types/utils";

import db from "../config";

export type ChatAttributes = {
  id: number;
  chatIdTg: string;
  messageLimit: number;
  messageQuantity: number;
  createdAt: Date;
  updatedAt: Date;
};

type ChatCreationAttributes = Optional<ChatAttributes, "id">;

class Chat extends Model<ChatAttributes, ChatCreationAttributes> {
  declare id: CreationOptional<number>;
  declare chatIdTg: string;
  declare messageLimit: number;
  declare messageQuantity: number;
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
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100,
    },
    messageQuantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
    tableName: "chats",
    sequelize: db,
  }
);

export default Chat;
