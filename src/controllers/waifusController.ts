import { Transaction } from "sequelize";

import db from "../db/models";
import utilsController from "./utilsController";
import activeController from "./activeController";
import userController from "./userController";
import i18n from "../config/i18n";

const { Waifus, WaifuLists } = db;

// private functions
const _getWaifuTypeNumberToMessage = (waifuTypeNumber: number) => {
  switch (waifuTypeNumber) {
    case 3:
      return 0;
    case 4:
      return 1;
    case 2 | 7 | 8:
      return 2;
    case 1 | 5:
      return 3;
    default:
      return 4;
  }
};

const _getWaifuAgeNumberToMessage = (waifuAgeNumber: number) => {
  const ageCategoryValue =
    waifuAgeNumber == 0 || waifuAgeNumber >= 70
      ? 0
      : waifuAgeNumber < 16
      ? 1
      : waifuAgeNumber >= 16 && waifuAgeNumber < 18
      ? 2
      : waifuAgeNumber >= 18 && waifuAgeNumber < 40
      ? 3
      : 4;
  return ageCategoryValue;
};

// public functions

const getWaifuById = async (id: number) => {
  try {
    const waifu = await Waifus.findOne({
      where: { id },
      include: [
        Waifus.associations.event,
        Waifus.associations.franchise,
        Waifus.associations.rarity,
        Waifus.associations.waifuType,
      ],
    });

    if (!waifu) throw "no waifu found";
    return waifu;
  } catch (error) {
    global.logger.error(error);
    throw error;
  }
};

const proteccWaifuValidator = async (chatTgId: string, text: string) => {
  try {
    const waifuActive = await activeController.getWaifuActiveToChatIdTg(
      chatTgId
    );
    const regExp = new RegExp(/[\s_.,-]/);
    let characterCaptured = { captured: false, waifu: waifuActive };
    const namesSenders = text.split(regExp);
    const allNicknamesCharacter = waifuActive.nickname?.split(regExp) ?? [];
    const allNamesCharacter = waifuActive.name.split(regExp);

    const namesSendersLength = namesSenders.length;
    const nicknamesLength = allNicknamesCharacter.length;
    const namesWaifuLength = allNamesCharacter.length;

    console.log(namesSenders, allNicknamesCharacter, allNamesCharacter);

    // verify nicknames
    for (let i = 0; i < nicknamesLength; i++) {
      const regExpBase = `${allNicknamesCharacter[i].toLocaleLowerCase()}`;
      const regExpNickname = new RegExp(regExpBase);
      console.log(regExpNickname);
      for (let j = 1; j < namesSendersLength; j++) {
        console.log(regExpNickname.test(namesSenders[j].toLocaleLowerCase()));
        if (regExpNickname.test(namesSenders[j].toLocaleLowerCase()))
          characterCaptured.captured = true;
      }
    }

    if (characterCaptured.captured) return characterCaptured;

    // verify names
    for (let i = 0; i < namesWaifuLength; i++) {
      const regExpBase = `${allNamesCharacter[i].toLocaleLowerCase()}`;
      const regExpName = new RegExp(regExpBase);
      console.log(regExpName);
      for (let j = 1; j < namesSendersLength; j++) {
        console.log(regExpName.test(namesSenders[j].toLocaleLowerCase()));
        if (regExpName.test(namesSenders[j].toLocaleLowerCase()))
          characterCaptured.captured = true;
      }
    }

    return characterCaptured;
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

const addWaifuToUserList = async (
  waifuId: number,
  userId: number,
  t: Transaction | undefined
) => {
  const trans = t ?? (await db.sequelize.transaction());
  try {
    const waifuList = await WaifuLists.findOne({
      where: { waifuId, userId },
    });

    if (waifuList) {
      waifuList.update(
        { quantity: waifuList.quantity + 1, updatedAt: new Date() },
        { transaction: trans }
      );
    } else {
      await WaifuLists.create(
        {
          waifuId,
          userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { transaction: trans }
      );
    }

    const result = await userController.addExpToUser(userId, waifuId, trans);
    const user = await userController.getUserById(userId);
    const waifu = await getWaifuById(waifuId);
    const franchise = await waifu.getFranchise();

    const initialMessage = i18n.__(
      "waifuProtecc",
      user.nickname,
      `${waifu.name}${waifu.nickname ? " - (" + waifu.nickname + ")" : ""}`,
      `${franchise.name}${
        franchise.nickname ? " - (" + franchise.nickname + ")" : ""
      }`
    );
    const messageExpWon = i18n.__n("waifuExpWon", result.expWon);
    const messageLevelUp = result.levelUp
      ? i18n.__n("levelUp", result.level)
      : "";
    const messageNewFavoritePage =
      result.levelUp && result.level % 5 == 0
        ? i18n.__n("wonFavoritePage", result.level / 5)
        : "";
    const waifuType = _getWaifuTypeNumberToMessage(waifu.waifuTypeId);
    const messageWaifuType = i18n.__n("waifuProteccType", waifuType);
    const waifuAge = _getWaifuAgeNumberToMessage(waifu.age);
    const messageWaifuAge = i18n.__n("waifuProteccAge", waifuAge);

    const messageReturn = `${initialMessage}\n${messageExpWon} ${messageLevelUp} ${messageNewFavoritePage}\n${messageWaifuType}\n${messageWaifuAge}`;
    if (!t) await trans.commit();
    return {
      message: messageReturn,
      sendButtonReport: waifu.age > 0 && waifu.age < 18,
    };
  } catch (error) {
    if (!t) await trans.rollback();
    global.logger.error(error);
    throw error;
  }
};

export default {
  getWaifuById,
  proteccWaifuValidator,
  searchRandomWaifu,
  addWaifuToUserList,
};
