const Active = require('../models/active');
const Franchise = require('../models/franchise');

module.exports = async function (message) {
  const { text } = message;
  // console.log(message);
  const name = text.split(' ');

  const active = await Active.findOne({ chatId: message.chat.id }).populate('waifu').exec();
  // console.log(active);
  if (active == null) return null;

  const waifuName = active.waifu.name.split(' ');
  const waifuNickname = active.waifu.nickname;

  let match = false;

  for (let i = 1; i < name.length; i++) {
    if (name[i].toLowerCase() == waifuNickname.toLowerCase()) {
      match = true;
      break;
    }
  }

  if (!match) {
    await waifuName.forEach(item => {
      for (let i = 1; i < name.length; i++) {
        if (name[i].toLowerCase() == item.toLowerCase()) {
          match = true;
          break;
        }
      }
    });
  }

  if (match) {
    const franchise = await Franchise.findById(active.waifu.franchise);
    return `Excelente has agregado a ${waifuName} (${waifuNickname}) de la franquicia ${franchise.name } a tu lista`;
  } else {
    const activeUpdate = await Active.findOneAndUpdate({ chatId: message.chat.id }, { $inc: { attempts: -1 } });
    console.log(activeUpdate);
    if (activeUpdate.attempts - 1 > 0) return `Los siento pero ese no es su nombre intentenlo de nuevo les queda/n ${activeUpdate.attempts - 1} intento/s`;
    await Active.findOneAndDelete({ chatId: message.chat.id });
    return `Los siento, se excedio el número de intentos, intentelos para la proxima`;
  }


}