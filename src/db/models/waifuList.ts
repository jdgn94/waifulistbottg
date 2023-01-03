import {
  CreationOptional,
  DataTypes,
  Model,
  Optional,
  literal,
} from "sequelize";
// import { Fn } from "sequelize/types/utils";

import db from "../config";

export type WaifuListAttributes = {
  id: number;
  userId: number;
  quantity: number;
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
      unique: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
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
    tableName: "waifuLists",
    sequelize: db,
  }
);

export default WaifuList;
