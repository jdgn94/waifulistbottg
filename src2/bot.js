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
bot.hashtag(['gay', 'Gay'], async ctx => await Hashtags.gay(ctx));
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

bot.hashtag(['horaDelDuelo', 'HoraDelDuelo'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1644267066/Waifu%20List%20Bot%20Telegram%20Videos/Duelo_wxqicp.mp4']));

bot.hashtag(['esponjaEnloquesiste', 'EsponjaEnloquesiste'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1644267153/Waifu%20List%20Bot%20Telegram%20Videos/Y2Mate_is__ESPONJA_ENLOQUECISTE__CpwfImSaXf8_720p_1643163760220_zn4xhq.mp4']));

bot.hashtag(['noLeCreas', 'NoLeCreas'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1644267234/Waifu%20List%20Bot%20Telegram%20Videos/Y2Mate_is_No_le_creas_Compadre_HDHora_de_AventuraPLANTILLA_PARA_vyo1yx.mp4']));

bot.hashtag(['reggaetonero', 'Reggaetonero'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1644267322/Waifu%20List%20Bot%20Telegram%20Videos/Y2Mate_is_Gunter__te_volviste_reggaetonero_Hora_de_aventura_Espa%C3%B1ol_rvvk8l.mp4']));

bot.hashtag(['noSiempreEsPorDinero', 'NoSiempreEsPorDinero'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1644267364/Waifu%20List%20Bot%20Telegram%20Videos/Y2Mate_is_NO_SIEMPRE_SE_TRATA_DE_DINERO_SPIDER_MAN_Videos_Plantillas_tqcbch.mp4']));

bot.hashtag(['laTraicion', 'LaTraicion', 'NTR'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1644267422/Waifu%20List%20Bot%20Telegram%20Videos/kndtraiccion_uhjooj.mp4']));

bot.hashtag(['suCuenta', 'SuCuenta', 'gordo', 'Gordo', 'gorda', 'Gorda'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1644267564/Waifu%20List%20Bot%20Telegram%20Videos/Y2Mate_is_LOS_CHICOS_DEL_BARRIO_DE_SABER_QUE_COMIAS_TANTO__MEJOR_iihka3.mp4']));

bot.hashtag(['laToxica', 'LaToxica'], async ctx => await Hashtags.sendVideoMeme(ctx, [
  'https://res.cloudinary.com/jdgn94/video/upload/v1644267643/Waifu%20List%20Bot%20Telegram%20Videos/Y2Mate_is_Chowder__y_Panini__Cuando_la_t%C3%B3xica_te_presume_H4eCe_XM_pngdrf.mp4',
  'https://res.cloudinary.com/jdgn94/video/upload/v1644267705/Waifu%20List%20Bot%20Telegram%20Videos/Y2Mate_is_D%C3%B3nde_estabas__qui%C3%A9n_es_ella_dime_lindura__G8IpzhPyMOk_ril2f1.mp4'
]));

bot.hashtag(['noExactamente', 'NoExactamente'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1644267777/Waifu%20List%20Bot%20Telegram%20Videos/Y2Mate.is_-_No_exactamente-O0mUEMqd118-720p-1643166407150_glzmyv.mp4']));

bot.hashtag(['laLoca', 'LaLoca'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1644267848/Waifu%20List%20Bot%20Telegram%20Videos/loca_rxh5ng.mp4']));

bot.hashtag(['miAmorPorElla', 'MiAmorPorElla'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1644267860/Waifu%20List%20Bot%20Telegram%20Videos/Y2Mate_is_Mi_amor_por_ella_quema_con_la_intensidad_de_mil_soles_pu41iq.mp4']));

bot.hashtag(['esGuapisimo', 'EsGuapisimo'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1644268035/Waifu%20List%20Bot%20Telegram%20Videos/guapisimo_t9ffrs.mp4']));

bot.hashtag(['estupido', 'Estupido', 'grandisimoEstupido', 'GrandisimoEstupido'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1644268036/Waifu%20List%20Bot%20Telegram%20Videos/Y2Mate_is_Eres_un_grandisimo_estupido__iiPySwRZ_XY_360p_1643490111458_wujmkq.mp4']));

bot.hashtag(['queLePasaEsEstupido', 'QueLePasaEsEstupido'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1644268036/Waifu%20List%20Bot%20Telegram%20Videos/Y2Mate_is__Que_le_pasa__Es_estupido_gDV8P34NBgs_480p_1643220975229_wcxmql.mp4']));

bot.hashtag(['teLoJuro', 'TeLoJuro'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1644268030/Waifu%20List%20Bot%20Telegram%20Videos/Y2Mate_is_Te_lo_juro_por_Dieguito_MaradonaPlantilla_de_memes_qFfN0geksi0_k3u1ek.mp4']));

bot.hashtag(['loQueHagoPorAmor', 'LoQueHagoPorAmor'], async ctx => await Hashtags.sendVideoMeme(ctx, [
  'https://res.cloudinary.com/jdgn94/video/upload/v1644268031/Waifu%20List%20Bot%20Telegram%20Videos/Y2Mate_is_Lo_que_hago_por_amor_Coraje_Plantilla_oFcpmOkp7As_720p_dyuafr.mp4',
  'https://res.cloudinary.com/jdgn94/video/upload/v1644268035/Waifu%20List%20Bot%20Telegram%20Videos/Y2Mate_is_CORAJE_EL_PERRO_COBARDE_LO_QUE_HAGO_POR_AMOR_PLANTILLA_gaz69j.mp4'
]));

bot.hashtag(['estupidoPerro', 'EstupidoPerro', 'meHicisteVerMal', 'MeHicisteVerMal'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1644268447/Waifu%20List%20Bot%20Telegram%20Videos/Estupido_Perro_jftszu.mp4']));

bot.hashtag(['teHeFallado', 'TeHeFallado', 'teFalle', 'TeFalle'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1644268404/Waifu%20List%20Bot%20Telegram%20Videos/Y2Mate.is_-_Te_he_fallado-EQqIinDXDgg-720p-1643491839415_fmis4x.mp4']));

bot.hashtag(['yaBasta', 'YaBasta'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1644268489/Waifu%20List%20Bot%20Telegram%20Videos/Y2Mate_is__YA_BASTA_FREEZER__7DB5AWxJ1Zg_1080p_1643490310609_adt4gw.mp4']));

bot.hashtag(['sanaMiDolor', 'SsanaMiDolor'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1644268574/Waifu%20List%20Bot%20Telegram%20Videos/Y2Mate_is_VEN_Y_SANA_MI_DOLOR_xpcNop7DmY0_720p_1643491626279_soipt8.mp4']));

bot.hashtag(['fueraImpulsoDeIdiotez', 'FueraImpulsoDeIdiotez'], async ctx => await Hashtags.sendVideoMeme(ctx, [
  'https://res.cloudinary.com/jdgn94/video/upload/v1644268752/Waifu%20List%20Bot%20Telegram%20Videos/Impulso_De_Idiotez_1_nh2cvw.mp4',
  'https://res.cloudinary.com/jdgn94/video/upload/v1644268774/Waifu%20List%20Bot%20Telegram%20Videos/Impulso_De_Idiotez_2_cagcox.mp4',
  'https://res.cloudinary.com/jdgn94/video/upload/v1644268728/Waifu%20List%20Bot%20Telegram%20Videos/Impulso_De_Idiotez_3_fw3t6a.mp4'
]));

bot.hashtag(['meEscuchan', 'MeEscuchan'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1644268743/Waifu%20List%20Bot%20Telegram%20Videos/Me_Escuchan_de9ikq.mp4']));

bot.hashtag(['horaDeLaRicura', 'HoraDeLaRicura', 'cumAcumulado', 'CumAcumulado'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1644268974/Waifu%20List%20Bot%20Telegram%20Videos/Y2Mate.is_-_BROLY_PUBERTO-758iUDBDwjA-720p-1643736724424_qexsps.mp4']));

bot.hashtag(['enTiemposDeGuerra', 'EnTiemposDeGuerra'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1644268917/Waifu%20List%20Bot%20Telegram%20Videos/Y2Mate.is_-_EN_LA_GUERRA...-PEdYnBBbiD0-480p-1643737202872_l6bjmg.mp4']));

bot.hashtag(['panico', 'Panico'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1644268876/Waifu%20List%20Bot%20Telegram%20Videos/Y2Mate_is_Es_tiempo_para__P%C3%81NICO__ZWgryNTFHXU_480p_1643736468532_mrswid.mp4']));

bot.hashtag(['obligamePerro', 'ObligamePerro'], async ctx => await Hashtags.sendVideoMeme(ctx, ['https://res.cloudinary.com/jdgn94/video/upload/v1644268853/Waifu%20List%20Bot%20Telegram%20Videos/Y2Mate_is_Obligame_perro_Meme_ybJo1WiFUT8_360p_1643736087951_ws8zpa.mp4']));

// bot.hashtag([''], async ctx => await Hashtags.sendVideoMeme(ctx, ['']));

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