import { Transaction } from "sequelize";
import Rarities, { WaifuRarityAttributes } from "../models/waifuRarity";

const rarities: WaifuRarityAttributes[] = [
  {
    id: 1,
    name: "commoun",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "epic",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: "legendary",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const insertRarity = async (t: Transaction): Promise<void> => {
  try {
    let raritiesToInsert: WaifuRarityAttributes[] = [];

    await Promise.all(
      rarities.map(async (rarity) => {
        const rarityInserted = await Rarities.findByPk(rarity.id);
        if (!rarityInserted) {
          raritiesToInsert.push(rarity);
        }
      })
    );

    await Rarities.bulkCreate(raritiesToInsert, { transaction: t });

    global.logger.info(`Inserted rarities ${raritiesToInsert.length} news`);
    return;
  } catch (error) {
    global.logger.error(error);
    throw new Error("Rarities no inserted");
  }
};

export { insertRarity };
