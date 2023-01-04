import db from "../db/models";

const { Chats } = db;

const getByTgId = async (id: string) => {
  const t = await db.sequelize.transaction();
  try {
    const chat = await Chats.findOrCreate({
      where: { chatIdTg: id },
      defaults: {
        chatIdTg: id,
        language: "en",
        messageLimit: 100,
        messageQuantity: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      transaction: t,
    });

    await t.commit();
    return chat[0];
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export { getByTgId };
