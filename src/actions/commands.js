const utils = require('../utils');
const axios = require('../config/axios');

const start = async ctx => { // hace la llamada para agregar el chat a la bd
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

const span = async ctx => {
  if (!await utils.verifyGroup(ctx)) return;

  await utils.sendWaifu(ctx);
};

const help = async ctx => {
  const message = `
Lista de los comando.
- /start se usa para inicir el bot, solo funciona 1 vez y debe ser usado en un grupo para que empieze a funcionar.
- /protecc se usa para agregar a la waifu que haya aparecido, debe ser usado con el nombre del personaje. Solo se la queda el que hacierte primero.
- /list muesta el listado de todas las waifus que tienes en tu lista
- /addFavorite agraga una waifu de tu lista a la favoritos, de ser usado con 2 números, el primero indica la posición en /list, el segundo la posición que le quieres agregar en el listado de favoritos.
- /favoriteList muestra el listado de favoritos con las images de los personajes, la cantidad de páginas depende del nivel que tenga el usuario.
- /tradeWaifu se usa para intercambiar waifus entre 2 usuarios del grupo, se usa de la siguiente forma, el primer número es la posición de tu en /list y el segundo número es la posición en /list del usuario con quien quieres intercambiar, el intercambio se hace contestando a un mensaje del usuario con quien quieres intercambiar.
- /top muestra la posición de los usuarios en orden de quien tenga mas waifus.
- /changeTime cambia la cantidad de mensajes necesarios para que puedan aparecen waifus (50 - 1000)-
- /profile muestra el perfíl de la persona que lo pidio.

Lista de hashtags, estos envian un sticker o un gif.
- yaoiFanBoy, fanBoy o yaoi.
- plusUltra o plus manada un sticker con tematica gay.
- LGBT o lgbt.
- gay.
- sape, cruz o cross.
- F o f.
- police o policia.
- llamarPolicia o callPolice.
- FBI o fbi.
- sangradoNasal, sangre, sangrado o blood.
- trap, isATrap o trapo.
- licencia o licence.
- chao, bye, byeBye o correr.
- clorox, cloro, chlorine.
- cachetada, bofetada o bitchSlapt. (gif)`;

  return utils.sendMessage(ctx, message, { reply_to_message_id: ctx.message.message_id });
}

const protecc = async ctx => { // comando para proteger una waifu que salga
  if (!await utils.verifyGroup(ctx)) return;
  
  const { message } = ctx;
  const response = await axios.post('/waifus/protecc', { message });
  if (response.status == 200) return utils.sendMessage(ctx, response.data.message, { reply_to_message_id: message.message_id });
};

const list = async ctx => { // envia el listado de waifus que tengal el usuari que envio el correo
  if (ctx.chat.type != 'group' && ctx.chat.type != 'supergroup') return;
  const { message } = ctx;
  const { text, extras } = await utils.searchList(message.from.id, message.chat.id, message.message_id);

  return await utils.sendMessage(ctx, text, extras);
};

const addFavorite = async ctx => { // se agrega una waifu al listado de favoritos
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

const favoriteList = async ctx => {
  if (!await utils.verifyGroup(ctx)) return;

  const { message } = ctx;
  const page = isNaN(parseInt(message.text.split(' ')[1])) ? 1 : message.text.split(' ')[1];
  const { status, data } = await axios.get(`/waifu_list/favorites?chatId=${message.chat.id}&userId=${message.from.id}&page=${page}`);
  switch(status){
    case 200: return await utils.sendAlbum(ctx, data.waifus, data.totalPages, page);
    case 201: return await utils.sendMessage(ctx, data.message, { reply_to_message_id: message.message_id });
    default: return await utils.sendMessage(ctx, 'Ocurrio un error obteniendo tu listado', { reply_to_message_id: message.message_id });
  }
}

const tradeWaifu = async ctx => {
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
      if (status == 200) {
        await utils.buttonsToTrade(ctx, data);
      } else return;
    }
  }
}; 

const top = async ctx => {
  if (!await utils.verifyGroup(ctx)) return;

  const { message } = ctx;
  const { status, data } = await axios.get(`/chats/top?chatId=${message.chat.id}`);
  switch(status) {
    case 200: return await utils.formatedUsers(ctx, data.users);
    case 201: return utils.sendMessage(ctx, 'Parece que nadie tiene una waifu su lista', { reply_to_message_id: message.message_id });
    default: return console.error("ocurrio un error");
  }
};

const changeTime = async ctx => {
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

const profile = async ctx => {
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

const active = async ctx => {
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
  help,
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