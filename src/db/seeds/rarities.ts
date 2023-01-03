import Rarities, { WaifuRarityAttributes } from "../models/waifuRarity";

const rarities: WaifuRarityAttributes[] = [
  {
    id: 1,
    name: "commoun",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 1,
    name: "epic",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 1,
    name: "legendary",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const insertRarity = async (): Promise<void> => {
  let raritiesToInsert: WaifuRarityAttributes[] = [];

  await Promise.all(
    rarities.map(async (rarity): Promise<void> => {
      const rarityInserted = await Rarities.findByPk(rarity.id);
      if (rarityInserted) {
        raritiesToInsert.push(rarity);
      }
    })
  );

  Rarities.bulkCreate(raritiesToInsert);
};

export default insertRarity;
