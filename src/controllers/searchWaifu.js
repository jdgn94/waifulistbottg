const Waifu = require('../models/waifu');

module.exports = async function (chatId) {
  const waifusId = await Waifu.find().select('_id');
  const length = waifusId.length;
  const randomNumber = Math.round(Math.random()*(0 - (length - 1)) + parseInt((length - 1)));
  const waifuId = waifusId[randomNumber];
  const waifu = await Waifu.findById(waifuId);

  console.log(chatId);
  return waifu;
}