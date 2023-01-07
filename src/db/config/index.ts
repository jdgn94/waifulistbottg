import dotenv from "dotenv";
import { Dialect, PoolOptions, Sequelize } from "sequelize";

process.env.NODE_ENV !== "production" && dotenv.config();

const development = {
  username: process.env.USERNAME ?? "root",
  password: process.env.PASSWORD ?? "",
  database: process.env.DATABASE ?? "dev",
  host: process.env.HOST ?? "127.0.0.1",
  port: Number(process.env.PORT_DB) ?? 3306,
  seederStorage: "sequelize",
  seederStorageTableName: "SequelizeSeeds",
  dialect: (process.env.DIALECT ?? "mysql") as Dialect,
  logging: process.env.NODE_ENV == "development",
  timezone: "-04:00",
  dialectOptions: {
    connectTimeout: 60000,
  },
  pool: {
    max: 10,
    min: 0,
    idle: 20000,
    acquire: 20000,
  } as PoolOptions,
};

const db = new Sequelize(
  development.database,
  development.username,
  development.password,
  {
    host: development.host,
    port: development.port,
    dialect: development.dialect,
    timezone: development.timezone,
    pool: development.pool,
    logging: development.logging,
    dialectOptions: development.dialectOptions,
  }
);

export default db;
