import {
  CreationOptional,
  DataTypes,
  Model,
  Optional,
  HasManyGetAssociationsMixin,
  Association,
} from "sequelize";

import db from "../config";
import UserInfo from "./userInfo";

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

  declare getUserInfo: HasManyGetAssociationsMixin<UserInfo>;

  public declare static associations: {
    userInfo: Association<User, UserInfo>;
  };
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

User.hasMany(UserInfo, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "userInfo",
});

export default User;
