import db from "../db/models";
import utilsController from "./utilsController";
import activeController from "./activeController";

const { Waifus } = db;

const proteccWaifuValidator = async (chatTgId: string, text: string) => {
  try {
    const waifuActive = await activeController.getWaifuActiveToChatIdTg(
      chatTgId
    );
    let waifuCaptured = { captured: false, waifu: waifuActive };
    const namesSenders = text.split(" ");
    const allNicnamesWaifu = waifuActive.nickname?.split(" ") ?? [];
    const allNamesWaifu = waifuActive.name.split(" ");

    const namesSendersLength = namesSenders.length;
    const nicknamesLength = allNicnamesWaifu.length;
    const namesWaifuLength = allNamesWaifu.length;

    console.log(namesSenders, allNicnamesWaifu, allNamesWaifu);

    // verify nicknames
    for (let i = 0; i < nicknamesLength; i++) {
      const rexgExpNickname = new RegExp(`\/${allNicnamesWaifu[i]}\/`);
      for (let j = 1; j < namesSendersLength; j++) {
        if (rexgExpNickname.test(namesSenders[j]))
          waifuCaptured.captured = true;
      }
    }

    if (waifuCaptured.captured) return waifuCaptured;

    // verify names
    for (let i = 0; i < namesWaifuLength; i++) {
      const rexgExpNickname = new RegExp(`\/${allNamesWaifu[i]}\/`);
      for (let j = 1; j < namesSendersLength; j++) {
        if (rexgExpNickname.test(namesSenders[j]))
          waifuCaptured.captured = true;
      }
    }

    return waifuCaptured;
  } catch (error) {
    global.logger.error(error);
    throw error;
  }
};

const searchRandomWaifu = async () => {
  try {
    const allWaifusId = await Waifus.findAll({
      attributes: ["id"],
      where: { eventId: 1 },
    });

    const ramdomPosition = utilsController.getRamdomIntegerNumber(
      0,
      allWaifusId.length
    );

    const waifuIdSelected = allWaifusId[ramdomPosition];
    const waifu = await Waifus.findByPk(waifuIdSelected.id);

    if (!waifu) throw "waifu not found";

    return waifu;
  } catch (error) {
    global.logger.error(error);
    throw error;
  }
};

export default { proteccWaifuValidator, searchRandomWaifu };
