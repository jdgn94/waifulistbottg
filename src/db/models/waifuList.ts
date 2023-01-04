import { CreationOptional, DataTypes, Model, Optional } from "sequelize";

import db from "../config";

export type WaifuListAttributes = {
  id: number;
  userId: number;
  quantity: number;
  waifuId: number;
  createdAt: Date;
  updatedAt: Date;
};

type WaifuListCreationAttributes = Optional<WaifuListAttributes, "id">;

class WaifuList extends Model<
  WaifuListAttributes,
  WaifuListCreationAttributes
> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare quantity: number;
  declare waifuId: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

WaifuList.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    waifuId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "waifus",
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
    tableName: "waifuLists",
    sequelize: db,
  }
);

export default WaifuList;
