import { CreationOptional, DataTypes, Model, Optional } from "sequelize";

import db from "../config";

export type WaifuRarityAttributes = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

type WaifuRarityCreationAttributes = Optional<WaifuRarityAttributes, "id">;

class WaifuRarity extends Model<
  WaifuRarityAttributes,
  WaifuRarityCreationAttributes
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

WaifuRarity.init(
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
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "waifuRarities",
    sequelize: db,
  }
);

export default WaifuRarity;
