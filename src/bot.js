const Telegraf = require('telegraf');
const axios = require('./config/axios');

const bot = new Telegraf(process.env.TOKEN_TG);  // poner el tocken en una variable de entorno
// const telegram = new Telegram(process.env.TOKEN_TG)

// bot.startPolling();
if (bot.isPolling()) {
  reinitPolling();
} else {
  initPolling();
}

async function initPolling() {
  await bot.startPolling();
}

async function reinitPolling() {
  await bot.stopPolling();
  await initPolling();
}

// Init
bot.start(async ctx => { // hace la llamada para agregar el chat a la bd
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
});

// comands
bot.command('span', async ctx => { // lanza una waifu para hacer pruebas
  if (ctx.chat.type != 'group' && ctx.chat.type != 'supergroup') return;
  await sendWaifu(ctx);
});

bot.command('protecc', async ctx => { // guarda a una waifu que este activa en el grupo
  if (ctx.chat.type != 'group' && ctx.chat.type != 'supergroup') return;
  const { message } = ctx;
  const response = await axios.post('/waifus/protecc', { message });
  if (response.status == 200) {
    ctx.reply(response.data.message, { reply_to_message_id: message.message_id });
  }
  return await addCountInChat(ctx);
});

bot.command('list', async ctx => { // envia el listado de waifus que tengal el usuari que envio el correo
  if (ctx.chat.type != 'group' && ctx.chat.type != 'supergroup') return;
  const { message } = ctx;
  const { text, extras } = await searchList(message.from.id, message.chat.id, message.message_id);

  ctx.reply(text, extras);
  return await addCountInChat(ctx);
});

bot.command('addfavorite', async ctx => {
  if (ctx.chat.type != 'group' && ctx.chat.type != 'supergroup') return;
  const { message } = ctx;
  const text = message.text.split(' ');
  const waifu = text[1];
  const position = text[2];
  if (!waifu && !position) return ctx.reply('Debes enviar el mensaje de la siguiente manera\n/addfavorite <numero de tu lista> <posición deseada>\nSolo puedes tener a 9 personajes en esta lista', { reply_to_message_id: message.message_id });

  const body = {
    waifuNumber: waifu,
    position,
    chatId: message.chat.id,
    userId: message.from.id
  }
  const response = await axios.post('/waifus/change_favorite', body);
  if (response.status == 200) ctx.reply(response.data.message, { reply_to_message_id: message.message_id });
  return await addCountInChat(ctx);
});

bot.command('favoritelist', async ctx => {
  const { message } = ctx;
  const response = await axios.get(`/waifu_list/favorites?chatId=${message.chat.id}&userId=${message.from.id}`);
  const { status, data } = response;
  switch(status){
    case 200: await sendAlbum(ctx, data.waifus); break;
    case 201: ctx.reply(data.message, { reply_to_message_id: message.message_id }); break;
    default: ctx.reply('Obtube un error, intentalo mas tarde', { reply_to_message_id: message.message_id }); break;
  }
  return await addCountInChat(ctx);
});

bot.command('tradewaifu', async ctx => {
  if (ctx.chat.type != 'group' && ctx.chat.type != 'supergroup') return;
  const { message } = ctx;
  const text = message.text.split(' ');

  const myWaifuNumber = parseInt(text[1]);
  const otherWaifuNumber = parseInt(text[2]);
  if (isNaN(myWaifuNumber) || isNaN(otherWaifuNumber) || myWaifuNumber <= 0 || otherWaifuNumber <= 0) {
    ctx.reply('Lo siento, la forma del comando es la siguiente /tradewaifu <numero en tu lista> <numero en la lista de quien deseas cambiar>\nDebe ser respondiendo el mensaje de la persona con quien quieres cambiar', { reply_to_message_id: message.message_id });
  } else if (message.reply_to_message.from.is_bot) {
    ctx.reply('Lo siento, los bots no tienen lista', { reply_to_message_id: message.message_id });
  } else if (message.from.id == message.reply_to_message.from) {
    ctx.reply('No puedes intercambiar contigo mismo', { reply_to_message_id: message.message_id })
  } else {
    const body = {
      myWaifuNumber,
      otherWaifuNumber,
      chatId: message.chat.id,
      userId: message.from.id,
      otherUserId: message.reply_to_message.from.id
    }
    const { status, data } = await axios.put('/waifu_list/trade_proposition', body);
    switch(status) {
      case 200: 
        const extra = Telegraf.Extra
        .markup(m => m.inlineKeyboard([
          m.callbackButton('Aceptar cambio', 'approve'),
          m.callbackButton('Rechazar cambio', 'decline')
        ]))
        const messageSend = await ctx.reply(`@${message.reply_to_message.from.username}. El usuario @${message.from.username} quiere intercambiar contigo a su ${data.myWaifu.name} de ${data.myWaifu.franchise} por tu ${data.otherWaifu.name} de ${data.otherWaifu.franchise}\nEstado del mensaje: pendiente`, extra); 
        await axios.put('/waifu_list/update_trade', { messageId: messageSend.message_id, tradeId: data.tradeId });
        break;
    }
  }

  return await addCountInChat(ctx)
}); 

bot.command('top', async ctx => {
  if (ctx.chat.type != 'group' && ctx.chat.type != 'supergroup') return;
  const { message } = ctx;
  const { status, data } = await axios.get(`/chats/top?chatId=${message.chat.id}`);
  switch(status) {
    case 200: await formatedUsers(ctx, data.users); break;
    case 201: ctx.reply('Parece que nadie tiene una waifu su lista', { reply_to_message_id: message.message_id }); break;
    default: console.error("ocurrio un errir"); break;
  }
  return await addCountInChat(ctx);
});

bot.command('changetime', async ctx => { // cambia el limite de mensajes necesatios para hacer aparecer a las waifus
  if (ctx.chat.type != 'group' && ctx.chat.type != 'supergroup') return;
  const { message } = ctx;
  const text = message.text.split(' ');
  const quantity = parseInt(text[1]);
  if (quantity < 50 || quantity > 1000 || isNaN(quantity)) return ctx.reply('Lo siento, para cambiar la aparicion de waifus debes poner un número entre 50 y 1000 para realizar el cambio', { reply_to_message_id: message.message_id });
  const { status, data } = await axios.put(`/chats/change_time`, { chatId: ctx.message.chat.id, quantity });
  if (status == 200) return ctx.reply('Se actualizo el limite para la aprarición de waifus', { reply_to_message_id: message.message_id });
  ctx.reply('Ups, no se pudo hacer el cambio debido a un error', { reply_to_message_id: message.message_id });
  return await addCountInChat(ctx);
});

// actions
bot.action('nextPage', ctx => changePage(ctx));
bot.action('previusPage', ctx => changePage(ctx));
bot.action('details', ctx => details(ctx));
bot.action('approve', ctx => trade(ctx, true));
bot.action('decline', ctx => trade(ctx, false))

// hastags 
bot.hashtag(['yaoiFanBoy', 'fanBoy', 'yaoi'], async ctx => {
  const messageId = ctx.message.reply_to_message ? ctx.message.reply_to_message.message_id : null;
  ctx.replyWithSticker('CAACAgEAAxkAAIDi1-DKqj8D0CM0QzQ0W3Rkc7pBWVRAAIeAANL72IWgBwm30ZgSj0bBA', { reply_to_message_id: messageId });
  return await addCountInChat(ctx);
});

bot.hashtag('conversationType', async ctx => {
  ctx.reply(`Conversacion de tipo: ${ctx.message.chat.type}`, { reply_to_message_id: ctx.message.message_id });
});

bot.hashtag('gay', async ctx => {
  const messageId = ctx.message.reply_to_message ? ctx.message.reply_to_message.message_id : null;
  ctx.replyWithSticker('CAACAgEAAxkBAAIDkF-DK0g2dWKYx-w716WQN6FvUM-SAAIjAANL72IWW0PmnHdw13QbBA', { reply_to_message_id: messageId });
  return await addCountInChat(ctx);
});

bot.hashtag(['F', 'f'], async ctx => {
  const stickers = [
    'CAACAgEAAxkBAAIDk1-DLINsDisUJqimmKLe0zufzyhIAAIWAANL72IW8l1GQ8Z5SBgbBA',
    'CAACAgEAAxkBAAIDlF-DLMV_L22Vq_juo1qPP4JxKEQnAAIXAANL72IWNRr8dz1iQxwbBA',
    'CAACAgEAAxkBAAIDlV-DLrLI_tViej4v3T5tELpzpCbRAAIYAANL72IWPu400BTw6pQbBA'
  ];

  const messageId = ctx.message.reply_to_message ? ctx.message.reply_to_message.message_id : null;
  ctx.replyWithSticker(await randomSticker(stickers, 2), { reply_to_message_id: messageId });
  return await addCountInChat(ctx);
});

bot.hashtag(['police', 'policia'], async ctx => {
  const stickers = [
    'CAACAgEAAxkBAAIDm1-DMjp5V0HFsrGdKbccEA_RgXboAAITAANL72IWPF3ohpMX_oMbBA',
    'CAACAgEAAxkBAAIDn1-DMyPGY9SGXUNMhRccrmw86omzAAIaAANL72IWnOdxaTIgp7kbBA'
  ];

  
  const messageId = ctx.message.reply_to_message ? ctx.message.reply_to_message.message_id : null;
  ctx.replyWithSticker(await randomSticker(stickers, 1), { reply_to_message_id: messageId });
  return await addCountInChat(ctx);
});

bot.hashtag(['llamarPolicia', 'callPolice'], async ctx => {
  const stickers = [
    'CAACAgEAAxkBAAIDnV-DMpVgxq1H9CqI-fgOeA-S9a2iAAIUAANL72IW99r5Q6ya434bBA',
    'CAACAgEAAxkBAAIDnl-DMuvfEDFHBLEz81LMOS__ZG7oAAIVAANL72IWjyX83syGtkQbBA'
  ];

  const messageId = ctx.message.reply_to_message ? ctx.message.reply_to_message.message_id : null;
  ctx.replyWithSticker(await randomSticker(stickers, 1), { reply_to_message_id: messageId });
  return await addCountInChat(ctx);
});

bot.hashtag(['sangradoNasal', 'sangre'], async ctx => {
  const stickers = [
    'CAACAgEAAxkBAAIDol-DM_0YmHe_cdmG-jq_DmPTIMijAAIdAANL72IW7LfNiAxbyV0bBA',
    'CAACAgEAAxkBAAIDoV-DM_tZCHQSGi7FlTQIVjZ3DDZIAAIcAANL72IWJi_8KGo0aL4bBA',
    'CAACAgEAAxkBAAIDoF-DM_dTDSdsx7uo-sjbmQepPIT9AAIbAANL72IW93D7-bIcP8YbBA'
  ];

  const messageId = ctx.message.reply_to_message ? ctx.message.reply_to_message.message_id : null;
  ctx.replyWithSticker(await randomSticker(stickers, 2), { reply_to_message_id: messageId });
  return await addCountInChat(ctx);
})

bot.hashtag(['trap', 'isATrap'], async ctx => {
  const stickers = [
    'CAACAgEAAxkBAAIDpl-DNHR9a_e6Wm5nbDCNrVa_rTCCAAIiAANL72IWEYqdLvsk1lcbBA',
    'CAACAgEAAxkBAAIDpV-DNHISU50VfJ943vPyXKiB7Wj7AAIhAANL72IWNBBA3cU6ycAbBA',
    'CAACAgEAAxkBAAIDpF-DNG8ltcZRAAFj2Jf_7GoVxaUZ4gACIAADS-9iFp-BKRd9tOH4GwQ',
    'CAACAgEAAxkBAAIDo1-DNGyhbTwZ_2Z_HKHf-Ofnt3Q4AAIfAANL72IW8FV2JeUM-RUbBA'
  ];

  const messageId = ctx.message.reply_to_message ? ctx.message.reply_to_message.message_id : null;
  ctx.replyWithSticker(await randomSticker(stickers, 3), { reply_to_message_id: messageId });
  return await addCountInChat(ctx);
})

// hears
bot.hears(['lanzar una moneda', 'lanzar moneda', 'Lanzar una moneda', 'Lanzar moneda'], async ctx => {
  const { message } = ctx
  function throwCoin() {
    const number = Math.round(Math.random() * (0 - 1) + 1);
    if (number == 1) return 'cara';
    else return 'cruz'
  }
  ctx.reply(`@${message.from.username} ha lanzado una moneda y salio ${throwCoin()}.`, { reply_to_message_id: message.message_id })
  return await addCountInChat(ctx);
});

bot.hears(['mamon', 'Mamon'], async ctx => {
  if (ctx.chat.type != 'group' && ctx.chat.type != 'supergroup') return;
  const messageId = ctx.message.reply_to_message ? ctx.message.reply_to_message.message_id : null;
  ctx.reply('Veeeeeeeeeeeeeeee y que mamon xD', { reply_to_message_id: messageId});
  return await addCountInChat(ctx);
})

bot.hears(['gay', 'marico', 'maricon', 'pato', 'homosexsual', 'Gay', 'Marico', 'Maricon', 'Pato', 'Homosexsual'], ctx => {
  if (ctx.chat.type != 'group' && ctx.chat.type != 'supergroup') return;
  ctx.reply('Secundo la noción de esta agradable persona', { reply_to_message_id: ctx.message.message_id });
  return addCountInChat(ctx);
}); 

// on 
// ['text', 'sticker', 'image', 'audio', 'video', 'document']
bot.on('message', async ctx => {
  if (ctx.chat.type == 'group' || ctx.chat.type == 'supergroup') await addCountInChat(ctx);
  return;
});

// functions 
async function addCountInChat(ctx) {
  const response = await axios.get(`/chats/${ctx.chat.id}`);
  if (response.status == 200) await sendWaifu(ctx);
  return;
}

async function sendWaifu(ctx) { // busca y envia una waifu al chat
  const { chat } = ctx;
  const response = await axios.get(`/waifus/send_waifu?chatId=${chat.id}`);

  if (response.status == 200) {
    const { waifu } = response.data;
    ctx.replyWithPhoto(
      {
        url: waifu.image_url,
        filename: waifu.public_id
      },
      {
        caption: 'Aparecio una waifu, tienen un maximo de 10 intentos para descubir quien es, manda el comando /protecc <name o apodo> para agregarla a tu lista'
      }
    );
  }
}

async function waifusText(data) { // formatea el mensaje del listado de las waifus
  let waifusFormated = [];
  const { page, waifus } = data;

  await waifus.forEach((waifu, index) => {

    if (index == 0 || waifu.franchise_id != waifus[index -1].franchise_id) waifusFormated.push(`\n - ${waifu.franchise}`);
    waifusFormated.push(`${((page -1) * 20) + index + 1}.- ${waifu.name}${waifu.nickname.length > 0 ? ' (' + waifu.nickname + ')' : ''} ${waifu.servant ? '(NP' + waifu.quantity + ')' : waifu.quantity > 1 ? '(' + waifu.quantity + ')' : ''}`)
  });
  return waifusFormated;
}

async function searchList (userId, chatIs, messageId, page = 1) { // envia el mensaje con la lista de las waifus de un usuario con los botones de acciones
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
  .markup((m) => m.inlineKeyboard(buttons(m, parseInt(data.page), parseInt(data.totalPages))));

  return { text, extras };
}

async function changePage (ctx) { // funcion para cambiar la pagina en el mensaje del listado de waifus
  const { data, message, from } = ctx.update.callback_query;
  if (from.id != message.reply_to_message.from.id) return;
  const buttons = message.reply_markup.inline_keyboard[0];
  const buttonSelected = await buttons.filter(button => button.callback_data == data);
  let goTo;
  if (data == 'nextPage') goTo = buttonSelected[0].text.split(' ')[1];
  else goTo = buttonSelected[0].text.split(' ')[2];
  const { text, extras } = await searchList(from.id, message.chat.id, message.message_id, goTo);
  return ctx.editMessageText(text, extras)
}

async function details (ctx) { // funcion para mandar un mensaje que da la informacion del listado
  const { callback_query } = ctx.update
  if (callback_query.from.id != callback_query.message.reply_to_message.from.id) return;
  const response = await axios.get(`/waifu_list/details?userId=${callback_query.from.id}&chatId=${callback_query.message.chat.id}`);
  if (response.status != 200) return;
  const { data } = response;
  return ctx.reply(`@${callback_query.from.username}. ${data.message} \nIlegales = ${data.ilegals}. \nLegales = ${data.legals}. \nIndefinidas = ${data.indefinides}. \nTotal = ${data.totals}.`);
}

function buttons(m, page, totalPages) { // funcion para el pintado de los botones para el mensaje del listado
  const extraButton = m.callbackButton('🔍 Detalles', 'details');
  const buttonPrevius = m.callbackButton(`⬅️ Página ${page - 1}`, 'previusPage');
  const buttonNext =  m.callbackButton(`Página ${page + 1} ➡️`, 'nextPage');
  
  if (page == 1 && totalPages < 2) return [extraButton];
  else if (page == 1 && totalPages > 1) return [buttonNext, extraButton];
  else if (page == totalPages && totalPages > 1) return [buttonPrevius, extraButton];
  else return [buttonPrevius, buttonNext, extraButton];
}

async function sendAlbum(ctx, waifus) { // envia un album de fotos de la lista de favoritas
  const waifusFormated = await waifus.map(waifu => {
    return {
      media: { url: waifu.image_url },
      filename: waifu.public_id,
      caption: `${medalPosition(waifu.position)}.- ${waifu.name} - ${waifu.franchise}`,
      type: 'photo'
    }
  });

  return ctx.replyWithMediaGroup(waifusFormated, { reply_to_message_id: ctx.message.message_id });
}

async function formatedUsers(ctx, users) { // formatea a los usuarios para el envio de posiciones
  const usersFormated = [];
  await users.forEach(async (user, index) => {
    await usersFormated.push(`${medalPosition(index + 1)}.- ${user.nickname} (${user.quantity}).`);
  });

  return ctx.reply(`Estas son las posiciones de los 10 mejores\n\n${usersFormated.join('\n')}`, { reply_to_message_id: ctx.message.message_id });
}

async function trade(ctx, action) { // funcion para aprobar o crechazar el intercambio
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
      ctx.reply(data.message);
      return;
    case 201: return ctx.editMessageText(`${text[0]} rechazada ❌`);
    case 202:
      ctx.editMessageText(`${text[0]} cancelada ⚠️`);
      ctx.reply(data.message);
      return;
    default: return;
  }
}

async function randomSticker(stickers, max) {
  const position = await Math.round(Math.random() * (0 - max) + max);
  return stickers[position];
}

function medalPosition(position) {
  switch (position) {
    case 1: return '🥇';
    case 2: return '🥈';
    case 3: return '🥉';
    default: return position;
  }
}

module.exports = bot;