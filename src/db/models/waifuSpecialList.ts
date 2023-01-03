import {
  CreationOptional,
  DataTypes,
  Model,
  Optional,
  literal,
} from "sequelize";
// import { Fn } from "sequelize/types/utils";

import db from "../config";

export type WaifuSpecialListAttributes = {
  id: number;
  specialImageId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

type WaifuSpecialListCreationAttributes = Optional<
  WaifuSpecialListAttributes,
  "id"
>;

class WaifuSpecialList extends Model<
  WaifuSpecialListAttributes,
  WaifuSpecialListCreationAttributes
> {
  declare id: CreationOptional<number>;
  declare specialImageId: number;
  declare userId: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

WaifuSpecialList.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    specialImageId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "specialImages",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "users",
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
    tableName: "waifuSpecialLists",
    sequelize: db,
  }
);

export default WaifuSpecialList;
