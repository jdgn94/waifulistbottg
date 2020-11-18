const Telegraf = require('telegraf');
const Commands = require('./actions/commands');
const Hashtags = require('./actions/hashtags');
const Hears = require('./actions/hears');
const utils = require('./utils');

const bot = new Telegraf(process.env.TOKEN_TG);  // poner el tocken en una variable de entorno
// const telegram = new Telegram(process.env.TOKEN_TG)

bot.startPolling();

// Init
bot.start(async ctx => Commands.start(ctx)); // hace la llamada para agregar el chat a la bd

// comands
bot.command('span', async ctx => await Commands.span(ctx));

bot.command('protecc', async ctx => await Commands.protecc(ctx)); // comando para proteger una waifu que salga

bot.command('list', async ctx => await Commands.list(ctx)); // envia el listado de waifus que tengal el usuari que envio el correo

bot.command('addfavorite', async ctx => await Commands.addFavorite(ctx)); // se agrega una waifu al listado de favoritos

bot.command('favoritelist', async ctx => await Commands.favoriteList(ctx)); // muestra las imagenesd del listado de favoritos

bot.command('tradewaifu', async ctx => await Commands.tradeWaifu(ctx)); // para crear un intercambio de waifus entre 2 usuarios

bot.command('top', async ctx => await Commands.top(ctx)); // muestra la tabla de posiciones del grupo

bot.command('changetime', async ctx => await Commands.changeTime(ctx)); // cambia el limite de mensajes necesatios para hacer aparecer a las waifus

bot.command('profile', async ctx => await Commands.profile(ctx)); // muestra el perfil del usuario que lo pide

bot.command('active', async ctx => await Commands.active(ctx));
// actions
bot.action('nextPage', ctx => utils.changePage(ctx));
bot.action('previusPage', ctx => utils.changePage(ctx));
bot.action('details', ctx => utils.details(ctx));
bot.action('approve', ctx => utils.trade(ctx, true));
bot.action('decline', ctx => utils.trade(ctx, false));

// hastags 
bot.hashtag(['yaoiFanBoy', 'fanBoy', 'yaoi'], async ctx => await Hashtags.yaoi(ctx));

bot.hashtag(['plusUltra', 'plus'], async ctx => await Hashtags.plus(ctx));

bot.hashtag(['LGBT', 'lgbt'], async ctx => await Hashtags.lgbt(ctx));

bot.hashtag('gay', async ctx => await Hashtags.gay(ctx));

bot.hashtag(['sape', 'cruz', 'cross'], async ctx => await Hashtags.cross(ctx));

bot.hashtag(['F', 'f'], async ctx => await Hashtags.respect(ctx));

bot.hashtag(['police', 'policia'], async ctx => await Hashtags.police(ctx));

bot.hashtag(['llamarPolicia', 'callPolice'], async ctx => await Hashtags.callPolice(ctx));

bot.hashtag(['FBI', 'fbi'], async ctx => await Hashtags.fbi(ctx));

bot.hashtag(['sangradoNasal', 'sangre'], async ctx => await Hashtags.blood(ctx));

bot.hashtag(['trap', 'isATrap'], async ctx => await Hashtags.trap(ctx))

bot.hashtag(['cachetada', 'bofetada', 'bitchSlapt'], async ctx => await Hashtags.bitchSlap(ctx));

// hears
bot.hears(['lanzar una moneda', 'lanzar moneda', 'Lanzar una moneda', 'Lanzar moneda'], async ctx => await Hears.coing(ctx));

bot.hears(['mamon', 'Mamon'], async ctx => await Hears.mamon(ctx))

bot.hears(['gay', 'marico', 'maricon', 'amarico', 'homosexsual', 'Gay', 'Marico', 'Maricon', 'Amarico', 'Homosexsual'], async ctx => await Hears.toInsult(ctx)); 

// on 
// ['text', 'sticker', 'image', 'audio', 'video', 'document']
bot.on('message', async ctx => {
  // console.log(ctx.message);
  if (await utils.verifyGroup(ctx)) await utils.addCountInChat(ctx);
  return;
});

module.exports = bot;