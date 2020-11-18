const Telegraf = require('telegraf');
const axios = require('../config/axios');

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

  const waifusFormated = await waifusText(data);
  const text = `
    ${data.message} \n${data.waifus.length > 0 ? waifusFormated.join('\n') : ''}
  `;

  const extras = Telegraf.Extra
  .inReplyTo(messageId)
  .markdown()
  .markup((m) => m.inlineKeyboard(buttonsToList(m, parseInt(data.page), parseInt(data.totalPages))));

  return { text, extras };
};

const waifusText = async (data) => { // formatea el mensaje del listado de las waifus
  let waifusFormated = [];
  const { page, waifus } = data;

  await waifus.forEach((waifu, index) => {

    if (index == 0 || waifu.franchise_id != waifus[index -1].franchise_id) waifusFormated.push(`\n - ${waifu.franchise}`);
    waifusFormated.push(`${((page -1) * 20) + index + 1}.- ${waifu.name}${waifu.nickname.length > 0 ? ' (' + waifu.nickname + ')' : ''} ${waifu.servant ? '(NP' + waifu.quantity + ')' : waifu.quantity > 1 ? '(' + waifu.quantity + ')' : ''}`)
  });
  return waifusFormated;
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

const trade = async (ctx, action)  => { // funcion para aprobar o crechazar el intercambio
  const { message, from } = ctx.update.callback_query;
  const body = {
    messageId: message.message_id,
    userTgId: from.id,
    answer: action
  };
  const { data, status } = await axios.put('/waifu_list/trade_answer', body);
  const text = message.text.split(' pendiente');
  switch(status) {
    case 200:  
      ctx.editMessageText(`${text[0]} aceptada ✅`);
      sendMessage(ctx, data.message);
      return;
    case 201: return ctx.editMessageText(`${text[0]} rechazada ❌`);
    case 202:
      ctx.editMessageText(`${text[0]} cancelada ⚠️`);
      sendMessage(ctx, data.message);
      return;
    default: return;
  }
};



// INFO: botones
const buttonsToTrade = async ctx => { // botones para el intercambio de waifus
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

// INFO: enviar mensaje
const sendMessage = async (ctx, text = '', extra = {}) => {
  await addCountInChat(ctx);
  const messageData = ctx.reply(text, extra);
  return messageData;
};

const sendSticker = async (ctx, stickers = []) => {
  if (stickers.length == 0) return sendMessage(ctx, 'Este sticker no esta definido todavia', { reply_to_message_id: ctx.message.message_id });
  
  const messageId = ctx.message.reply_to_message ? ctx.message.reply_to_message.message_id : null;
  const sticker = await selectRandom(stickers);

  await addCountInChat(ctx);
  const messageData = await ctx.replyWithSticker(sticker, { reply_to_message_id: messageId });
  return messageData;
};

const sendAnimationLink = async (ctx, links = []) => {
  if (links.length == 0) return sendMessage(ctx, 'No hay animacion para este Hashtag', { reply_to_message_id: ctx.message.message_id });
  
  const messageId = ctx.message.reply_to_message ? ctx.message.reply_to_message.message_id : null;
  const url = await selectRandom(links);

  const arrayName = gif.split('/');
  const filename = arrayName[arrayName.length - 1];

  const messageFormated = {
    url,
    filename,
  };

  await addCountInChat(ctx);
  const messageData = await ctx.replyWithAnimation(messageFormated, { reply_to_message_id: messageId });
  return messageData;
};

const sendAlbum = async (ctx, waifus, totalPages, page = 1) => { // envia un album de fotos de la lista de favoritas
  const waifusFormated = await waifus.map(waifu => {
    return {
      media: { url: waifu.fav_image_url ? waifu.fav_image_url : waifu.image_url },
      filename: waifu.fav_public_id ? waifu.fav_public_id : waifu.public_id,
      caption: `${medalPosition(waifu.position)}.- ${waifu.name} - ${waifu.franchise}`,
      type: 'photo'
    }
  });

  const messageGalery = await ctx.replyWithMediaGroup(waifusFormated, { reply_to_message_id: ctx.message.message_id });
  console.log('datos del mensaje enviado', messageGalery);
  
  // TODO: mensaje del paginado, hacer que funcione bien para ponerlo
  // const extras = Telegraf.Extra
  // .inReplyTo(messageGalery[0].message_id)
  // .markdown()
  // .markup((m) => m.inlineKeyboard(buttonsFavorites(m, parseInt(page), parseInt(totalPages))));

  // ctx.reply(`@${ctx.message.from.username}, este es tu listado.\nPágina: 1/${totalPages}`, extras);
  return;
};

module.exports = {
  verifyGroup,
  sendWaifu,
  searchList,
  formatedUsers,
  
  changePage,
  details,
  trade,
  
  buttonsToTrade,
  addCountInChat,

  sendMessage,
  sendSticker,
  sendAnimationLink,
  sendAlbum,
};