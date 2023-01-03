import {
  CreationOptional,
  DataTypes,
  Model,
  Optional,
  literal,
} from "sequelize";
// import { Fn } from "sequelize/types/utils";

import db from "../config";

export type SpecialImageAttributes = {
  id: number;
  franchiseId: number;
  publicId: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

type SpecialImageCreationAttributes = Optional<SpecialImageAttributes, "id">;

class SpecialImage extends Model<
  SpecialImageAttributes,
  SpecialImageCreationAttributes
> {
  declare id: CreationOptional<number>;
  declare franchiseId: number;
  declare publicId: string;
  declare imageUrl: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

SpecialImage.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    franchiseId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "franchises",
        key: "id",
      },
    },
    publicId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0,
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
    tableName: "specialImages",
    sequelize: db,
  }
);

export default SpecialImage;
