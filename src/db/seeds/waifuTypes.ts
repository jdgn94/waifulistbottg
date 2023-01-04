import { Transaction } from "sequelize";
import WaifuTypes, { WaifuTypeAttributes } from "../models/waifuType";

const waifyTypes: WaifuTypeAttributes[] = [
  {
    id: 1,
    name: "loli",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "normal",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: "milf",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: "superMilf",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    name: "superLoli",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    name: "gothic",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    name: "loliBusty",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    name: "busty",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const insertWaifuTypes = async (t: Transaction) => {
  try {
    let waifuTypesToInsert: WaifuTypeAttributes[] = [];

    await Promise.all(
      waifyTypes.map(async (waifuType) => {
        const waifuTypeInserted = await WaifuTypes.findByPk(waifuType.id);
        if (!waifuTypeInserted) {
          waifuTypesToInsert.push(waifuType);
        }
      })
    );

    await WaifuTypes.bulkCreate(waifuTypesToInsert, { transaction: t });

    global.logger.info(
      `Inserted waifu types ${waifuTypesToInsert.length} news`
    );
    return;
  } catch (error) {
    global.logger.error(error);
    throw error;
  }
};

export { insertWaifuTypes };
