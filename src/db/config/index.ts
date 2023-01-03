import dotenv from "dotenv";
import { Sequelize } from "sequelize";

process.env.NODE_ENV !== "production" && dotenv.config();

const development = {
  username: process.env.USERNAME || "root",
  password: process.env.PASSWORD || "",
  database: process.env.DATABASE || "dev",
  host: process.env.HOST || "localhost",
  port: process.env.PORT_DB || 3306,
  seederStorage: "sequelize",
  seederStorageTableName: "SequelizeSeeds",
  logging: false,
  timezone: "-04:00",
  dialectOptions: {
    connectTimeout: 60000,
  },
  pool: {
    max: 10,
    min: 0,
    idle: 20000,
    acquire: 20000,
  },
};

const db = new Sequelize(
  development.database,
  development.username,
  development.password,
  {
    host: development.host,
    port: Number(development.port),
    dialect: "mysql",
    timezone: development.timezone,
    pool: development.pool,
    dialectOptions: development.dialectOptions,
  }
);

export default db;
