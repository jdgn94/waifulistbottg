const Telegraf = require('telegraf');
const axios = require('../config/axios');
const addSpecial = require('./addSpecial');

const verifyGroup = async ctx => {
  if (ctx.chat.type == 'group' || ctx.chat.type == 'supergroup') return true;
  else return false;
}

const sendWaifu = async ctx => {
  const { chat } = ctx;
  const response = await axios.get(`/waifus/send_waifu?chatId=${chat.id}`);

  if (response.status == 200) {
    const { waifu } = response.data;
    return ctx.replyWithPhoto(
      {
        url: waifu.image_url,
        filename: waifu.public_id
      },
      {
        caption: 'Aparecio una waifu, tienen un maximo de 10 intentos para descubir quien es, manda el comando /protecc <name o apodo> para agregarla a tu lista'
      }
    );
  }
};

const searchList = async (userId, chatIs, messageId, page = 1) => { // envia el mensaje con la lista de las waifus de un usuario con los botones de acciones
  const response = await axios.get(`/waifu_list?userTgId=${userId}&chatTgId=${chatIs}&page=${page}`);
  if (response.status == 201) return { text: response.data.message, extras: { reply_to_message_id: messageId }}
  if (response.status != 200) return { text: 'Lo siento no pude obtener tu listado, intentalo mas tarde', extras: { reply_to_message_id: messageId }};
  const { data } = response;

  const formated = await waifusText(data);
  const text = `
    ${data.message} \n${data.waifus.length > 0 ? formated.join('\n') : ''}
  `;

  const extras = Telegraf.Extra
  .inReplyTo(messageId)
  .markdown()
  .markup((m) => m.inlineKeyboard(buttonsToList(m, parseInt(data.page), parseInt(data.totalPages))));

  return { text, extras };
};

const searchFavorite = async (userId, chatId, page = 1, ctx, username) => {
  const { status, data } = await axios.get(`/waifu_list/favorites?chatId=${chatId}&userId=${userId}&page=${page}`);
  switch(status){
    case 200: return await sendAlbum(ctx, data.waifus, data.totalPages, page, username);
    case 201: return await sendMessage(ctx, `@${username}. ${data.message}`);
    default: return await sendMessage(ctx, `Ocurrio un error obteniendo tu listado @${username}`);
  }
}

const searchSpecial = async (userId, chatId, page = 1, ctx, username) => {
  const { status, data } = await axios.get(`/special_image/list?chatId=${chatId}&userId=${userId}&page=${page}`);
  switch(status){
    case 200: return await sendAlbumSpecial(ctx, data.list, data.totalPages, page, username);
    case 204: return await sendMessage(ctx, `@${username}. No tienes waifus en esta pagina`);
    default: return await sendMessage(ctx, `Ocurrio un error obteniendo tu listado @${username}`);
  }
}

const waifusText = async (data) => { // formatea el mensaje del listado de las waifus
  let formated = [];
  const { page, waifus } = data;

  await waifus.forEach((waifu, index) => {

    if (index == 0 || waifu.franchise_id != waifus[index -1].franchise_id) formated.push(`\n - ${waifu.franchise}`);
    formated.push(`${((page -1) * 20) + index + 1}.- ${waifu.name}${waifu.nickname.length > 0 ? ' (' + waifu.nickname + ')' : ''} ${waifu.servant ? '(NP' + waifu.quantity + ')' : waifu.quantity > 1 ? '(' + waifu.quantity + ')' : ''}`)
  });
  return formated;
};

const formatedUsers = async (ctx, users) => { // formatea a los usuarios para el envio de posiciones
  const usersFormated = [];
  await users.forEach(async (user, index) => {
    await usersFormated.push(`${medalPosition(index + 1)}.- ${user.nickname} (${user.quantity}).`);
  });

  const text = `Estas son las posiciones de los 10 mejores\n\n${usersFormated.join('\n')}`;
  const extra = { reply_to_message_id: ctx.message.message_id }

  return await sendMessage(ctx, text, extra);
}

// INFO: acciones
const changePage = async (ctx) => { // funcion para cambiar la pagina en el mensaje del listado de waifus
  const { data, message, from } = ctx.update.callback_query;
  if (from.id != message.reply_to_message.from.id) return;
  const buttons = message.reply_markup.inline_keyboard[0];
  const buttonSelected = await buttons.filter(button => button.callback_data == data);
  let goTo;
  if (data == 'nextPage') goTo = buttonSelected[0].text.split(' ')[1];
  else goTo = buttonSelected[0].text.split(' ')[2];
  const { text, extras } = await searchList(from.id, message.chat.id, message.message_id, goTo);
  return ctx.editMessageText(text, extras)
};

const details = async (ctx) => { // funcion para mandar un mensaje que da la informacion del listado
  const { callback_query } = ctx.update
  if (callback_query.from.id != callback_query.message.reply_to_message.from.id) return;
  const response = await axios.get(`/waifu_list/details?userId=${callback_query.from.id}&chatId=${callback_query.message.chat.id}`);
  if (response.status != 200) return;
  const { data } = response;
  const text = `@${callback_query.from.username}. ${data.message} \nIlegales = ${data.ilegals}. \nLegales = ${data.legals}. \nIndefinidas = ${data.indefinides}. \nTotal = ${data.totals}.`;
  
  return sendMessage(ctx, text);
};

const changePageFav = async (ctx) => { // funcion para cambiar la pagina en el mensaje del listado de waifus
  const { data, message, from } = ctx.update.callback_query;
  const username = message.text.split(',')[0].slice(1);
  if (from.username !== username) return;
  const buttons = message.reply_markup.inline_keyboard[0];
  const buttonSelected = await buttons.filter(button => button.callback_data == data);
  let nextPage;
  if (data == 'nextPageFav') nextPage = buttonSelected[0].text.split(' ')[1];
  else nextPage = buttonSelected[0].text.split(' ')[2];
  await searchFavorite(from.id, message.chat.id, nextPage, ctx, username);
};

const detailsFav = async (ctx) => { // funcion para mandar un mensaje que da la informacion del listado
  const { callback_query } = ctx.update
  const { message, from } = callback_query;
  const username = message.text.split(',')[0].slice(1);
  if (from.username !== username) return;
  const { status, data } = await axios.get(`/waifu_list/favorites_details?userId=${callback_query.from.id}&chatId=${callback_query.message.chat.id}`);
  const messageToSend = `Ok @${username}, este es el detalle de tu lista de favoritos.\n${data.message}`;
  console.log(messageToSend);
  const result = await sendMessage(ctx, messageToSend);
  return result;
};

const changePageSpecial = async (ctx) => { // funcion para cambiar la pagina en el mensaje del listado de imagenes especiales
  const { data, message, from } = ctx.update.callback_query;
  const username = message.text.split(',')[0].slice(1);
  if (from.username !== username) return;
  const buttons = message.reply_markup.inline_keyboard[0];
  const buttonSelected = await buttons.filter(button => button.callback_data == data);
  let nextPage;
  if (data == 'nextPageSpecial') nextPage = buttonSelected[0].text.split(' ')[1];
  else nextPage = buttonSelected[0].text.split(' ')[2];
  await searchSpecial(from.id, message.chat.id, nextPage, ctx, username);
};

const trade = async (ctx, action)  => { // funcion para aprobar o crechazar el intercambio
  const { message, from } = ctx.update.callback_query;
  const body = {
    messageId: message.message_id,
    userTgId: from.id,
    answer: action
  };
  const dataTrade = await axios.get('/waifu_list/trade_info?messageId=' + message.message_id);
  const { data, status } = await axios.put('/waifu_list/trade_answer', body);
  const text = message.text.split(' pendiente');
  switch(status) {
    case 200:  
      ctx.editMessageText(`${text[0]} aceptada ✅`);
      sendMessage(ctx, data.message);
      const emiterParams = { chatId: dataTrade.chatId, userId: dataTrade.user_emiter_id, waifuId: dataTrade.waifu_emiter_id, newWaofi: true }
      const dataEmiter = await addSpecial.addImageSpecialToList(emiterParams);
      if (dataEmiter) sendMessage(ctx, `@${dataTrade.user_emiter_name}, ${data.message}`);
      const receptorParams = { chatId: dataTrade.chatId, userId: dataTrade.user_receptor_id, waifuId: dataTrade.waifu_receptor_id, newWaofi: true }
      const dataReceptor = await addSpecial.addImageSpecialToList(receptorParams);
      if (dataReceptor) sendMessage(ctx, `@${dataTrade.user_receptor_name}, ${data.message}`);
      return;
    case 201: 
      ctx.editMessageText(`${text[0]} rechazada ❌`);
      return sendMessage(ctx, `El intercambio fue rechazado por ${message.from.username}`)
    case 202:
      ctx.editMessageText(`${text[0]} cancelada ⚠️`);
      return sendMessage(ctx, data.message);
    default: return;
  }
};



// INFO: botones
const buttonsToTrade = async (ctx, data) => { // botones para el intercambio de waifus
  const extra = Telegraf.Extra
  .markup(m => m.inlineKeyboard([
    m.callbackButton('Aceptar cambio', 'approve'),
    m.callbackButton('Rechazar cambio', 'decline')
  ]))

  const text = `@${ctx.message.reply_to_message.from.username}. El usuario @${ctx.message.from.username} quiere intercambiar contigo a su ${data.myWaifu.name} de ${data.myWaifu.franchise} por tu ${data.otherWaifu.name} de ${data.otherWaifu.franchise}\nEstado del mensaje: pendiente`;
  const messageSend = await sendMessage(ctx, text, extra); 
  
  await axios.put('/waifu_list/update_trade', { messageId: messageSend.message_id, tradeId: data.tradeId });
  return;
};

const buttonsToList = (m, page, totalPages) => { // funcion para el pintado de los botones para el mensaje del listado
  const extraButton = m.callbackButton('🔍 Detalles', 'details');
  const buttonPrevius = m.callbackButton(`⬅️ Página ${page - 1}`, 'previusPage');
  const buttonNext =  m.callbackButton(`Página ${page + 1} ➡️`, 'nextPage');
  
  if (page == 1 && totalPages < 2) return [extraButton];
  else if (page == 1 && totalPages > 1) return [buttonNext, extraButton];
  else if (page == totalPages && totalPages > 1) return [buttonPrevius, extraButton];
  else return [buttonPrevius, buttonNext, extraButton];
};

const buttonsFavorites = (m, page, totalPages) => { // funcion para el pintado de los botones para el mensaje del listado
  const extraButton = m.callbackButton('🔍 Detalles', 'detailsFav');
  const buttonPrevius = m.callbackButton(`⬅️ Página ${page - 1}`, 'previusPageFav');
  const buttonNext =  m.callbackButton(`Página ${page + 1} ➡️`, 'nextPageFav');
  
  if (page == 1 && totalPages < 2) return [extraButton];
  else if (page == 1 && totalPages > 1) return [buttonNext, extraButton];
  else if (page == totalPages && totalPages > 1) return [buttonPrevius, extraButton];
  else return [buttonPrevius, buttonNext, extraButton];
};

const buttonsSpecial = (m, page, totalPages) => { // funcion para el pintado de los botones para el mensaje del listado
  const buttonPrevius = m.callbackButton(`⬅️ Página ${page - 1}`, 'previusPageSpecial');
  const buttonNext =  m.callbackButton(`Página ${page + 1} ➡️`, 'nextPageSpecial');
  
  if (page == 1 && totalPages < 2) return [];
  else if (page == 1 && totalPages > 1) return [buttonNext];
  else if (page == totalPages && totalPages > 1) return [buttonPrevius];
  else return [buttonPrevius, buttonNext];
};

// INFO: extra

const medalPosition = (position) => {
  switch (position) {
    case 1: return '🥇';
    case 2: return '🥈';
    case 3: return '🥉';
    default: return position;
  }
}

const selectRandom = async (array = []) => {
  const max = array.length - 1;
  const position = await Math.round(Math.random() * (0 - max) + max);
  return array[position];
}

const addCountInChat = async ctx => {
  if (!await verifyGroup(ctx)) return;

  const response = await axios.get(`/chats/${ctx.chat.id}`);
  if (response.status == 200) await sendWaifu(ctx);
  return;
}

const waifusFormated = async (waifus, addCaption = true) => {
  return await waifus.map(waifu => {
    return {
      media: { url: waifu.fav_image_url ? waifu.fav_image_url : waifu.image_url },
      filename: waifu.fav_public_id ? waifu.fav_public_id : waifu.public_id,
      caption: addCaption ? `${medalPosition(waifu.position)}.- ${waifu.name} - ${waifu.franchise}` : '',
      type: 'photo'
    }
  });
}

// INFO: enviar mensaje
const sendMessage = async (ctx, text = '', extra = {}) => {
  await addCountInChat(ctx);
  const messageData = ctx.reply(text, extra);
  return messageData;
};

const sendSticker = async (ctx, stickers = [], personal = false) => {
  if (stickers.length == 0) return sendMessage(ctx, 'Este sticker no esta definido todavia', { reply_to_message_id: ctx.message.message_id });
  
  const messageId = personal ? ctx.message.message_id : ctx.message.reply_to_message ? ctx.message.reply_to_message.message_id : null;
  const sticker = await selectRandom(stickers);

  await addCountInChat(ctx);
  const messageData = await ctx.replyWithSticker(sticker, { reply_to_message_id: messageId });
  return messageData;
};

const sendAnimationLink = async (ctx, links = []) => {
  if (links.length == 0) return sendMessage(ctx, 'No hay animacion para este Hashtag', { reply_to_message_id: ctx.message.message_id });
  
  const messageId = ctx.message.reply_to_message ? ctx.message.reply_to_message.message_id : null;
  const url = await selectRandom(links);

  const arrayName = url.split('/');
  const filename = arrayName[arrayName.length - 1];

  const messageFormated = {
    url,
    filename,
  };

  await addCountInChat(ctx);
  const messageData = await ctx.replyWithAnimation(messageFormated, { reply_to_message_id: messageId });
  return messageData;
};

const sendAlbum = async (ctx, waifus, totalPages, page = 1, usernameTemp = '') => { // envia un album de fotos de la lista de favoritas
  const formated = await waifusFormated(waifus);
  const messageId = ctx.message ? ctx.message.message_id : null;

  const messageGalery = await ctx.replyWithMediaGroup(formated, { reply_to_message_id: messageId });

  const extras = Telegraf.Extra
  .inReplyTo(messageGalery[0].message_id)
  .markdown()
  .markup((m) => m.inlineKeyboard(buttonsFavorites(m, parseInt(page), parseInt(totalPages))));

  const username = ctx.message ? ctx.message.from.username : usernameTemp;

  ctx.reply(`@${username}, este es tu listado.\nPágina: ${page}/${totalPages}`, extras);
  return;
};

const sendAlbumSpecial = async (ctx, list, totalPages, page, usernameTemp = '') => {
  const formated = await waifusFormated(list, false);
  const messageId = ctx.message ? ctx.message.message_id : null;

  const messageGalery = await ctx.replyWithMediaGroup(formated, { reply_to_message_id: messageId });
  console.log(messageGalery);

  const extras = Telegraf.Extra
  .inReplyTo(messageGalery[0].message_id)
  .markdown()
  .markup((m) => m.inlineKeyboard(buttonsSpecial(m, parseInt(page), parseInt(totalPages))));

  const username = ctx.message ? ctx.message.from.username : usernameTemp;
  ctx.reply(`@${username}, este es tu listado especial, aqui se muestran las waifus que tienen un fuerte vinculo.\nPágina: ${page}/${totalPages}`, extras);
  return;
}

const sendLicence = async (ctx, links) => {
  const message = ctx.message;
  if (links.length == 0) return sendMessage(ctx, 'Este sticker no esta definido todavia', { reply_to_message_id: message.message_id });
  
  const extra = { reply_to_message_id: message.message_id };
  const image = await selectRandom(links);

  const arrayName = image.url.split('/');
  const filename = arrayName[arrayName.length - 1];

  const messageFormated = {
    url: image.url,
    filename,
  };

  let messageExtra = '';
  // types: 1 = valido, 2 = temporal, 3 = falsa
  switch (image.type) {
    case 1:
      messageExtra = `@${message.from.username} ha sacado una licencia y es legal te puedes quedar con la loli`;
      break;
    case 2:
      messageExtra = `@${message.from.username} ha sacado una licencia y es temporal, que suerte tienes, disfrutala al maximo que es temporal`;
      break;
    case 3:
      messageExtra = `@${message.from.username} ha sacado una licencia y es falsa, debes escapar rapido o te atraparan`;
      break;
    default:
      messageExtra = `No se que es esto`
      break;
  }

  await addCountInChat(ctx);
  const messageData = await ctx.replyWithAnimation(messageFormated, extra);
  await ctx.reply(messageExtra, extra);
  return messageData;
}

module.exports = {
  verifyGroup,
  sendWaifu,
  searchList,
  searchFavorite,
  searchSpecial,
  formatedUsers,
  
  changePage,
  details,
  changePageFav,
  detailsFav,
  changePageSpecial,
  trade,
  
  buttonsToTrade,
  addCountInChat,
  buttonsSpecial,

  sendMessage,
  sendSticker,
  sendAnimationLink,
  sendAlbum,
  sendAlbumSpecial,
  sendLicence,

  addSpecial
};