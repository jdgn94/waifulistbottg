import { CreationOptional, DataTypes, Model, Optional } from "sequelize";

import db from "../config";

export type UserAttributes = {
  id: number;
  userIdTg: number;
  nickname: string;
  createdAt: Date;
  updatedAt: Date;
};

type UserCreationAttributes = Optional<UserAttributes, "id">;

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: CreationOptional<number>;
  declare userIdTg: number;
  declare nickname: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userIdTg: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: "users",
    sequelize: db,
  }
);

export default User;
