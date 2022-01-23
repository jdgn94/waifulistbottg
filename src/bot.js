const Telegraf = require('telegraf');
const Commands = require('./actions/commands');
const Hashtags = require('./actions/hashtags');
const Hears = require('./actions/hears');
const utils = require('./utils');

const bot = new Telegraf(process.env.TOKEN_TG);  // poner el tocken en una variable de entorno
// const telegram = new Telegram(process.env.TOKEN_TG)

bot.startPolling();

// Init
// hace la llamada para agregar el chat a la bd
bot.start(async ctx => await Commands.start(ctx));

// comands
bot.command('span', async ctx => await Commands.span(ctx));

// comando que muestra todos los comandos y hashtags del bot
bot.command('/help', async ctx => await Commands.help(ctx));

// comando para proteger una waifu que salga
bot.command('protecc', async ctx => await Commands.protecc(ctx));

// envia el listado de waifus que tengal el usuari que envio el correo
bot.command('list', async ctx => await Commands.list(ctx));

// envia un album con las imagenes que uno tenga en el listado de especiales
bot.command('speciallist', async ctx => await Commands.specialList(ctx));

// se agrega una waifu al listado de favoritos
bot.command('addfavorite', async ctx => await Commands.addFavorite(ctx));

// elimina una waifu de la lista de favoritos
bot.command('removefavorite', async ctx => await Commands.removeFavorite(ctx));

// muestra las imagenesd del listado de favoritos
bot.command('favoritelist', async ctx => await Commands.favoriteList(ctx));

// para crear un intercambio de waifus entre 2 usuarios
bot.command('tradewaifu', async ctx => await Commands.tradeWaifu(ctx));

// muestra la tabla de posiciones del grupo
bot.command('top', async ctx => await Commands.top(ctx));

// cambia el limite de mensajes necesatios para hacer aparecer a las waifus
bot.command('changetime', async ctx => await Commands.changeTime(ctx));

// muestra el perfil del usuario que lo pide
bot.command('profile', async ctx => await Commands.profile(ctx));

// muesta el listado de franquicias, si se envia un numero se muestra el listado de waifus perteneciente a esa franquicia
bot.command('franchiselist', async ctx => await Commands.franchiseList(ctx));

// cambia puntos por waifu
bot.command('changepointstowaifu', async ctx => await Commands.addWaifu(ctx));

// cambia waifus por puntos
bot.command('changewaifutopoints', async ctx => await Commands.deleteWaifu(ctx));

// apuesta puntos para obtener mas si se acierta la franquicia de la proxima waifu
bot.command('bet', async ctx => await Commands.toBet(ctx));

// muestra a todas las apuestas del grupo que estan activas
bot.command('bets', async ctx => await Commands.allBets(ctx));

bot.command('active', async ctx => await Commands.active(ctx));
// actions

bot.action('nextPage', ctx => utils.changePage(ctx));
bot.action('previusPage', ctx => utils.changePage(ctx));
bot.action('details', ctx => utils.details(ctx));
bot.action('nextPageFav', ctx => utils.changePageFav(ctx));
bot.action('previusPageFav', ctx => utils.changePageFav(ctx));
bot.action('detailsFav', ctx => utils.detailsFav(ctx));
bot.action('previusPageSpecial', ctx => utils.changePageSpecial(ctx));
bot.action('nextPageSpecial', ctx => utils.changePageSpecial(ctx));
bot.action('previusPageFranchise', ctx => utils.changePageFranchise(ctx));
bot.action('nextPageFranchise', ctx => utils.changePageFranchise(ctx));
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

bot.hashtag(['sangradoNasal', 'sangre', 'sangrado', 'blood'], async ctx => await Hashtags.blood(ctx));

bot.hashtag(['trap', 'isATrap', 'trapo'], async ctx => await Hashtags.trap(ctx));

bot.hashtag(['licencia', 'licence'], async ctx => await Hashtags.licence(ctx));

bot.hashtag(['chao', 'bye', 'byeBye', 'correr'], async ctx => await Hashtags.bye(ctx));

bot.hashtag(['clorox', 'cloro', 'chlorine'], async ctx => await Hashtags.chlorine(ctx));

bot.hashtag(['cachetada', 'bofetada', 'bitchSlapt'], async ctx => await Hashtags.bitchSlap(ctx));

bot.hashtag(['marica', 'Marica'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1642944737/Waifu%20List%20Bot%20Telegram%20Videos/video_2022-01-23_09-31-45_glj8kr.mp4']));

bot.hashtag(['bienHecho', 'BienHecho'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1642945669/Waifu%20List%20Bot%20Telegram%20Videos/y2mate.com_-_Meme_Gohan_bien_hecho_Dragon_Ball_Z_480p_ut3way.mp4']));

bot.hashtag(['seMamo', 'SeMamo', 'cmamo', 'cMamo', 'CMamo'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1642945804/Waifu%20List%20Bot%20Telegram%20Videos/y2mate.com_-_Robot_chido_dice_jaja_c_mamo_360p_a6jo5f.mp4']));

bot.hashtag(['viejaSabrosa', 'ViejaSabrosa'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1642945966/Waifu%20List%20Bot%20Telegram%20Videos/video_2021-07-15_14-57-30_dptudk.mp4']));

bot.hashtag(['viejoSabroso', 'ViejoSabroso'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1642946104/Waifu%20List%20Bot%20Telegram%20Videos/videoplayback_sacoib.mp4']));

bot.hashtag(['terror', 'Terror', 'tengoMiedo', 'TengoMiedo'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1642948000/Waifu%20List%20Bot%20Telegram%20Videos/Y2Mate_is_en_ese_momento_cell_sintio_el_verdadero_terror_RaLI5iTdoXc_sykn79.mp4']));

bot.hashtag(['solYSexo', 'SolYSexo'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1642948125/Waifu%20List%20Bot%20Telegram%20Videos/Y2Mate_is_Ed__Edd_y_Eddy_Mi_carne_me_pide_sol_y_s3x0_Latino_56Q7jq1UmMc_u2i2lr.mp4']));

bot.hashtag(['soyBarbaro', 'SoyBarbaro'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1642950322/Waifu%20List%20Bot%20Telegram%20Videos/y2mate.com_-_Escena_del_meme_nombre_a_veces_soy_una_cosa_pero_b%C3%A1rbara_KND_Los_chicos_del_barrio_360p_igrewh.mp4']));

bot.hashtag(['adios', 'adiosAmigo', 'meVoy', 'Adios', 'AdiosAmigo', 'MeVoy'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1642950787/Waifu%20List%20Bot%20Telegram%20Videos/Adios_Amigou_zwxb8p.mp4']));

bot.hashtag(['antojaron', 'Antojaron'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1642950904/Waifu%20List%20Bot%20Telegram%20Videos/y2mate_com_ya_antojaron_meme_goku_full_HD_sin_marca_de_agua_360p_ahx9ml.mp4']));

// bot.hashtag([], async ctx => await Hashtags.sendVideoMeme(ctx, []));

// hears
bot.hears(['lanzar una moneda', 'lanzar moneda', 'Lanzar una moneda', 'Lanzar moneda'], async ctx => await Hears.coing(ctx));

bot.hears(['mamon', 'Mamon'], async ctx => await Hears.mamon(ctx));

bot.hears(['gay', 'marico', 'maricon', 'amarico', 'homosexsual', 'Gay', 'Marico', 'Maricon', 'Amarico', 'Homosexsual'], async ctx => await Hears.toInsult(ctx));

bot.on('message', async ctx => {
  // console.log(ctx.message);
  if (await utils.verifyGroup(ctx)) await utils.addCountInChat(ctx);
  return;
});

module.exports = bot;