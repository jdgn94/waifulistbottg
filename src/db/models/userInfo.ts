import { CreationOptional, DataTypes, Model, Optional } from "sequelize";

import db from "../config";

export type UserInfoAttributes = {
  id: number;
  userId: number;
  level: number;
  points: number;
  exp: number;
  limitExp: number;
  favoritePages: number;
  favoritePagePurchases: number;
  expMulti: number;
  expMultiExpire?: Date | null;
  totalBets: number;
  totalBetsWon: number;
  totalBetsLost: number;
  totalBetsPoints: number;
  totalBetsPointsWon: number;
  jail: boolean;
  jailExpire?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

type UserInfoCreationAttributes = Optional<UserInfoAttributes, "id">;

class UserInfo extends Model<UserInfoAttributes, UserInfoCreationAttributes> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare level: number;
  declare points: number;
  declare exp: number;
  declare limitExp: number;
  declare favoritePages: number;
  declare favoritePagePurchases: number;
  declare expMulti: number;
  declare expMultiExpire?: Date | null;
  declare totalBets: number;
  declare totalBetsWon: number;
  declare totalBetsLost: number;
  declare totalBetsPoints: number;
  declare totalBetsPointsWon: number;
  declare jail: boolean;
  declare jailExpire?: Date | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

UserInfo.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    level: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
    points: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    exp: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    limitExp: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 100,
    },
    favoritePages: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
    favoritePagePurchases: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    expMulti: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expMultiExpire: {
      type: DataTypes.DATE,
    },
    totalBets: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    totalBetsWon: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    totalBetsLost: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    totalBetsPoints: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    totalBetsPointsWon: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    jail: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    jailExpire: {
      type: DataTypes.DATE,
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
    tableName: "userInfos",
    sequelize: db,
  }
);

export default UserInfo;
