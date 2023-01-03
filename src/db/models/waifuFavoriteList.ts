import {
  CreationOptional,
  DataTypes,
  Model,
  Optional,
  literal,
} from "sequelize";
// import { Fn } from "sequelize/types/utils";

import db from "../config";

export type WaifuFavoriteListAttributes = {
  id: number;
  waifuListId: number;
  position: number;
  createdAt: Date;
  updatedAt: Date;
};

type WaifuFavoriteListCreationAttributes = Optional<
  WaifuFavoriteListAttributes,
  "id"
>;

class WaifuFavoriteList extends Model<
  WaifuFavoriteListAttributes,
  WaifuFavoriteListCreationAttributes
> {
  declare id: CreationOptional<number>;
  declare waifuListId: number;
  declare position: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

WaifuFavoriteList.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    waifuListId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true,
      references: {
        model: "waifuLists",
        key: "id",
      },
    },
    position: {
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
    tableName: "waifuFavoriteLists",
    sequelize: db,
  }
);

export default WaifuFavoriteList;
