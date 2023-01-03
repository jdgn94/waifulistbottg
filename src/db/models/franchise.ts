import {
  CreationOptional,
  DataTypes,
  Model,
  Optional,
  literal,
} from "sequelize";
// import { Fn } from "sequelize/types/utils";

import db from "../config";

export type FranchiseAttributes = {
  id: number;
  name: string;
  nickname: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type FranchiseCreationAttributes = Optional<FranchiseAttributes, "id">;

class Franchise extends Model<
  FranchiseAttributes,
  FranchiseCreationAttributes
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare nickname: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Franchise.init(
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
    nickname: {
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
    tableName: "franchises",
    sequelize: db,
  }
);

export default Franchise;
