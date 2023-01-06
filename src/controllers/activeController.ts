import db from "../db/models";

const { Waifus, Chats, Actives } = db;

const getWaifuActiveToChatIdTg = async (chatIdTg: string) => {
  try {
    const chat = await Chats.findOne({ where: { chatIdTg } });

    if (!chat) throw "no chat found";

    const active = await Actives.findOne({ where: { chatId: chat.id } });

    if (!active) throw "no actives found";

    const waifu = await Waifus.findOne({
      where: { id: active.waifuId },
      include: [Waifus.associations.waifuType],
    });

    console.log("datos de la waifu activa papa: ", waifu);

    if (!waifu) throw "no waifu found";

    return waifu;
  } catch (error) {
    global.logger.error(error);
    throw error;
  }
};

export default { getWaifuActiveToChatIdTg };
