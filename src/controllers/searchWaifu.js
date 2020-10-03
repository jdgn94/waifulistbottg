const Waifu = require('../models/waifu');
const Active = require('../models/active');
const Chat = require('../models/chat');

module.exports = async function (chatId) {
  const waifusId = await Waifu.find().select('_id');
  const length = waifusId.length;
  const randomNumber = Math.round(Math.random()*(0 - (length - 1)) + parseInt((length - 1)));
  const waifuId = waifusId[randomNumber];
  const waifu = await Waifu.findById(waifuId);

  const chat = await Chat.findOneAndUpdate({ chatId }, { countMessage: 0 });
  
  const active = await new Active({
    chatId,
    waifu: waifu._id
  }).save();
  return waifu;
}