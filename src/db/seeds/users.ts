import { Transaction } from "sequelize";
import Users, { UserAttributes } from "../models/user";

const users: UserAttributes[] = [
  {
    id: 2,
    userIdTg: 375582539,
    nickname: "jdgn94",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    userIdTg: 671602096,
    nickname: "KrisDFC",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    userIdTg: 905834040,
    nickname: "RicardoARiosP",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    userIdTg: 941573181,
    nickname: "Juan Daniel",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const insertUsers = async (t: Transaction) => {
  try {
    let usersToInsert: UserAttributes[] = [];

    await Promise.all(
      users.map(async (user) => {
        const userInserted = await Users.findByPk(user.id);
        if (!userInserted) {
          usersToInsert.push(user);
        }
      })
    );

    await Users.bulkCreate(usersToInsert, { transaction: t });

    global.logger.info(`Inserted users ${usersToInsert.length} news`);
    return;
  } catch (error) {
    global.logger.error(error);
    throw error;
  }
};

export { insertUsers };
