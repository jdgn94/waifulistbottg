import {
  CreationOptional,
  DataTypes,
  Model,
  Optional,
  literal,
} from "sequelize";
// import { Fn } from "sequelize/types/utils";

import db from "../config";

export type WaifuTypeAttributes = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

type WaifuTypeCreationAttributes = Optional<WaifuTypeAttributes, "id">;

class WaifuType extends Model<
  WaifuTypeAttributes,
  WaifuTypeCreationAttributes
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

WaifuType.init(
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
    tableName: "waifuTypes",
    sequelize: db,
  }
);

export default WaifuType;
