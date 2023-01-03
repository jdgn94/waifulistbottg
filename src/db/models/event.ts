import {
  CreationOptional,
  DataTypes,
  Model,
  Optional,
  literal,
} from "sequelize";
// import { Fn } from "sequelize/types/utils";

import db from "../config";

export type EventAttributes = {
  id: number;
  name: string;
  icon: string;
  initEvent: string;
  finishEvent: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

type EventCreationAttributes = Optional<EventAttributes, "id">;

class Event extends Model<EventAttributes, EventCreationAttributes> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare icon: string;
  declare initEvent: string;
  declare finishEvent: string;
  declare imageUrl: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Event.init(
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
      unique: true,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    initEvent: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    finishEvent: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
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
    tableName: "events",
    sequelize: db,
  }
);

export default Event;
