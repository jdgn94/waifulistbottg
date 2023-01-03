import {
  CreationOptional,
  DataTypes,
  Model,
  Optional,
  literal,
} from "sequelize";
// import { Fn } from "sequelize/types/utils";

import db from "../config";

export type BetAttributes = {
  id: number;
  userInfoId: number;
  franchiseId: number;
  quantity: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type BetCreationAttributes = Optional<BetAttributes, "id">;

class Bet extends Model<BetAttributes, BetCreationAttributes> {
  declare id: CreationOptional<number>;
  declare userInfoId: number;
  declare franchiseId: number;
  declare quantity: number;
  declare active: boolean;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Bet.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userInfoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    franchiseId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true,
      references: {
        model: "franchises",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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
    tableName: "bets",
    sequelize: db,
  }
);

export default Bet;
