import { Transaction } from "sequelize";
import Chats, { ChatAttributes } from "../models/chat";

const chats: ChatAttributes[] = [
  {
    id: 2,
    chatIdTg: "-416904585",
    messageLimit: 100,
    messageQuantity: 17,
    language: "en",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    chatIdTg: "-1001476406435",
    messageLimit: 100,
    messageQuantity: 31,
    language: "en",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const insertChats = async (t: Transaction) => {
  try {
    let chatsToInsert: ChatAttributes[] = [];

    await Promise.all(
      chats.map(async (chat) => {
        const chatInserted = await Chats.findByPk(chat.id);

        if (!chatInserted) {
          chatsToInsert.push(chat);
        }
      })
    );

    await Chats.bulkCreate(chatsToInsert, { transaction: t });

    global.logger.debug(`Inserted chats ${chatsToInsert.length} news`);
    return;
  } catch (error) {
    global.logger.error(error);
    throw error;
  }
};

export { insertChats };
