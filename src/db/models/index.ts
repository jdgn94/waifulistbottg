import sequelize from "sequelize";

import connect from "../config";

const db = {
  sequelize: connect,
  Sequelize: sequelize,
};

export default db;
