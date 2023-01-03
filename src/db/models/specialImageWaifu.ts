import {
  CreationOptional,
  DataTypes,
  Model,
  Optional,
  literal,
} from "sequelize";
// import { Fn } from "sequelize/types/utils";

import db from "../config";

export type SpecialImageWaifuAttributes = {
  id: number;
  specialImageId: number;
  waifuId: number;
  createdAt: Date;
  updatedAt: Date;
};

type SpecialImageWaifuCreationAttributes = Optional<
  SpecialImageWaifuAttributes,
  "id"
>;

class SpecialImageWaifu extends Model<
  SpecialImageWaifuAttributes,
  SpecialImageWaifuCreationAttributes
> {
  declare id: CreationOptional<number>;
  declare specialImageId: number;
  declare waifuId: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

SpecialImageWaifu.init(
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
    tableName: "specialImageWaifus",
    sequelize: db,
  }
);

export default SpecialImageWaifu;
