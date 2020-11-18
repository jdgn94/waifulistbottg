const utils = require('../utils');
const axios = require('../config/axios');

async function start (ctx) { // hace la llamada para agregar el chat a la bd
  const { chat } = ctx;
  if (chat.type == 'group' || chat.type == 'supergroup') {
    const response = await axios.post('/chats/add_chat', { chatId: chat.id }); 
    const { status, data } = response;

    switch(status) {
      case 200: 
        ctx.reply(data.message);
        sendWaifu(ctx);
        break;
      case 201:
        ctx.reply(data.message);
        break;
      default:
        ctx.reply(response.response.data.message);
    }

  } else {
    ctx.reply('Hola, si quieres que me ponga a trabajar agregame a tu grupo y usa el comando /start para que disfrutar del juego ');
  }
}

async function span (ctx) {
  if (!await utils.verifyGroup(ctx)) return;

  await utils.sendWaifu(ctx);
};

async function protecc (ctx) { // comando para proteger una waifu que salga
  if (!await utils.verifyGroup(ctx)) return;
  
  const { message } = ctx;
  const response = await axios.post('/waifus/protecc', { message });
  if (response.status == 200) return utils.sendMessage(ctx, response.data.message, { reply_to_message_id: message.message_id });
};

async function list (ctx) { // envia el listado de waifus que tengal el usuari que envio el correo
  if (ctx.chat.type != 'group' && ctx.chat.type != 'supergroup') return;
  const { message } = ctx;
  const { text, extras } = await utils.searchList(message.from.id, message.chat.id, message.message_id);

  return await utils.sendMessage(ctx, text, extras);
};

async function addFavorite (ctx) { // se agrega una waifu al listado de favoritos
  if (!await utils.verifyGroup(ctx)) return;

  const { message } = ctx;
  const text = message.text.split(' ');
  const waifu = text[1];
  const position = text[2];
  if (!waifu || !position) {
    const text = 'Debes enviar el mensaje de la siguiente manera\n/addfavorite <numero de tu lista> <posición deseada>\nEl maximo de personajes depende de tu nivel, el nivel que tienes actualmente lo puedes ver con /profile, cada pagina puede alvergar a 10 personajes';

    return await utils.sendMessage(ctx, text, { reply_to_message_id: message.message_id });
}

  const body = {
    waifuNumber: waifu,
    position,
    chatId: message.chat.id,
    userId: message.from.id
  }
  const response = await axios.post('/waifus/change_favorite', body);
  if (response.status == 200) return utils.sendMessage(ctx, response.data.message, { reply_to_message_id: message.message_id });
};

async function favoriteList (ctx) {
  if (!await utils.verifyGroup(ctx)) return;

  const { message } = ctx;
  const response = await axios.get(`/waifu_list/favorites?chatId=${message.chat.id}&userId=${message.from.id}&page=1`);
  const { status, data } = response;
  switch(status){
    case 200: return await utils.sendAlbum(ctx, data.waifus, data.totalPages);
    case 201: return await utils.sendAlbum(ctx, data.message, { reply_to_message_id: message.message_id });
    default: return await utils.sendAlbum(ctx, 'Ocurrio un error, intentalo mas tarde', { reply_to_message_id: message.message_id });
  }
}

async function tradeWaifu (ctx) {
  if (!await utils.verifyGroup(ctx)) return;

  const { message } = ctx;
  const text = message.text.split(' ');

  const myWaifuNumber = parseInt(text[1]);
  const otherWaifuNumber = parseInt(text[2]);
  if (isNaN(myWaifuNumber) || isNaN(otherWaifuNumber) || myWaifuNumber <= 0 || otherWaifuNumber <= 0) {
    const text = 'Lo siento, la forma del comando es la siguiente /tradewaifu <numero en tu lista> <numero en la lista de quien deseas cambiar>\nDebe ser respondiendo el mensaje de la persona con quien quieres cambiar';

    return await utils.sendMessage(ctx, text, { reply_to_message_id: message.message_id });
  } else if (message.reply_to_message){
    if(message.reply_to_message.from.is_bot) {
      return await utils.sendMessage(ctx, 'Lo siento, los bots no tienen lista', { reply_to_message_id: message.message_id });
    } else if (message.from.id == message.reply_to_message.from) {
      return await utils.sendMessage(ctx, 'No puedes intercambiar contigo mismo', { reply_to_message_id: message.message_id });
    } else {
      const body = {
        myWaifuNumber,
        otherWaifuNumber,
        chatId: message.chat.id,
        userId: message.from.id,
        otherUserId: message.reply_to_message.from.id
      }
      const { status, data } = await axios.put('/waifu_list/trade_proposition', body);
      if (status = 200) {
        await utils.buttonsToTrade(ctx);
      } else return;
    }
  }
}; 

async function top (ctx) {
  if (!await utils.verifyGroup(ctx)) return;

  const { message } = ctx;
  const { status, data } = await axios.get(`/chats/top?chatId=${message.chat.id}`);
  switch(status) {
    case 200: return await utils.formatedUsers(ctx, data.users);
    case 201: return utils.sendMessage(ctx, 'Parece que nadie tiene una waifu su lista', { reply_to_message_id: message.message_id });
    default: return console.error("ocurrio un error");
  }
};

async function changeTime (ctx) {
  if (!await utils.verifyGroup(ctx)) return;

  const { message } = ctx;
  const text = message.text.split(' ');
  const quantity = parseInt(text[1]);
  if (quantity < 50 || quantity > 1000 || isNaN(quantity)) {
    const text = 'Lo siento, para cambiar la aparicion de waifus debes poner un número entre 50 y 1000 para realizar el cambio'
    return utils.sendMessage(ctx, text, { reply_to_message_id: message.message_id });
  }
  const { status, data } = await axios.put(`/chats/change_time`, { chatId: ctx.message.chat.id, quantity });
  if (status == 200) return utils.sendMessage('Se actualizo el limite para la aprarición de waifus', { reply_to_message_id: message.message_id });
}

async function profile (ctx) {
  if (!await utils.verifyGroup(ctx)) return;

  const { message } = ctx;
  const response = await axios.get(`/user/profile?userId=${message.from.id}&chatId=${message.chat.id}`);
  const { data } = response;
  if (response.status == 201) {
    return utils.sendMessage(ctx, 'No tienes ningun perfil ya que no has optenido ninguna waifu', { reply_to_message_id: ctx.message.message_id });
  } else if (response.status != 200) return utils.sendMessage(ctx, 'Ocurrio un error', { reply_to_message_id: ctx.message.message_id });

  const text = `Perfil de @${message.from.username}.\nTotal de waifus: ${data.totalWaifus}.\nPaginas en favoritos: ${parseInt(data.profile.level / 5) + 1}.\nPuntos acumulados: ${data.profile.points}.\nExperiencia: ${data.profile.exp}/${data.profile.limit_exp}.\nNivel: ${data.profile.level}.`;

  return utils.sendMessage(ctx, text, { reply_to_message_id: ctx.message.message_id });
}

async function active (ctx) {
  if (await utils.verifyGroup(ctx)) return await utils.addCountInChat(ctx);

  const waifus = await axios.get('/waifus/active');
  let message = '';
  console.log(waifus.data);
  if (waifus.data.length > 0) {
    message = 'Las waifus activas son:\n';
    await waifus.data.forEach(waifu => {
      message += `Nombre: ${waifu.name}, Apodo: ${waifu.nickname}\n`;
    });
  } else {
    message = 'No hay ninguna waifu activa en este momento';
  }

  return utils.sendMessage(ctx, message, { reply_to_message_id: ctx.message.message_id });
}

module.exports = {
  start,
  span,
  protecc,
  list,
  addFavorite,
  favoriteList,
  tradeWaifu,
  top,
  changeTime,
  profile,
  active
};