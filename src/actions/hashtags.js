const { sendSticker, sendAnimationLink, sendLicence } = require('../utils');

const yaoi = async ctx => {
  const stickers = ['CAACAgEAAxkBAAIEGl-UO7m3p56b0TKcwQk8t3-fmqfoAAIeAANL72IWgBwm30ZgSj0bBA'];

  return sendSticker(ctx, stickers);
};

const plus = async ctx => {
  const stickers = ['CAACAgEAAxkBAAIEKF-UPg-UZYxqJ0hBRKrbRji5ijMzAAImAANL72IWfPOEKtO2BbwbBA'];

  return sendSticker(ctx, stickers);
};

const lgbt = async ctx => {
  const stickers = ['CAACAgEAAxkBAAIEKV-UPilgpQparm02N-5TYZXSQKA8AAInAANL72IWiLVl-oF7edsbBA'];

  return sendSticker(ctx, stickers);
};

const gay = async ctx => {
  const stickers = ['CAACAgEAAxkBAAIDkF-DK0g2dWKYx-w716WQN6FvUM-SAAIjAANL72IWW0PmnHdw13QbBA'];

  return sendSticker(ctx, stickers);
};

const cross = async ctx => {
  const stickers = ['CAACAgEAAxkBAAIEIF-UPSUfN-vIfLz7Pq-_yBrv49zFAAIkAANL72IWz3LEORLxDAEbBA'];

  return sendSticker(ctx, stickers);
};

const respect = async ctx => {
  const stickers = [
    'CAACAgEAAxkBAAIDk1-DLINsDisUJqimmKLe0zufzyhIAAIWAANL72IW8l1GQ8Z5SBgbBA',
    'CAACAgEAAxkBAAIDlF-DLMV_L22Vq_juo1qPP4JxKEQnAAIXAANL72IWNRr8dz1iQxwbBA',
    'CAACAgEAAxkBAAIDlV-DLrLI_tViej4v3T5tELpzpCbRAAIYAANL72IWPu400BTw6pQbBA'
  ];

  return sendSticker(ctx, stickers);
};

const police = async ctx => {
  const stickers = [
    'CAACAgEAAxkBAAIDm1-DMjp5V0HFsrGdKbccEA_RgXboAAITAANL72IWPF3ohpMX_oMbBA',
    'CAACAgEAAxkBAAIDn1-DMyPGY9SGXUNMhRccrmw86omzAAIaAANL72IWnOdxaTIgp7kbBA',
    'CAACAgEAAxkBAAIEJF-UPZgZ_fAzm6XnlfNhDH_OmnpeAAIrAANL72IWcLnIvDkJz88bBA',
    'CAACAgEAAxkBAAIEJV-UPba1SxUw2WOu-cdRqLWnyftoAAIoAANL72IWDLOD26jPWdQbBA'
  ];

  return sendSticker(ctx, stickers);
};

const callPolice = async ctx => {
  const stickers = [
    'CAACAgEAAxkBAAIDnV-DMpVgxq1H9CqI-fgOeA-S9a2iAAIUAANL72IW99r5Q6ya434bBA',
    'CAACAgEAAxkBAAIDnl-DMuvfEDFHBLEz81LMOS__ZG7oAAIVAANL72IWjyX83syGtkQbBA'
  ];

  return sendSticker(ctx, stickers);
};

const fbi = async ctx => {
  const stickers = [
    'CAACAgEAAxkBAAIEJl-UPdUZg-MmrjS-acVuK_OkUlgTAAIpAANL72IWi_Q1yk_i818bBA',
    'CAACAgEAAxkBAAIEJ1-UPeCtYtBOAjNT2ETP5PK24hw7AAIqAANL72IWh4Wy26GBtUwbBA'
  ];

  return sendSticker(ctx, stickers);
};

const blood = async ctx => {
  const stickers = [
    'CAACAgEAAxkBAAIDol-DM_0YmHe_cdmG-jq_DmPTIMijAAIdAANL72IW7LfNiAxbyV0bBA',
    'CAACAgEAAxkBAAIDoV-DM_tZCHQSGi7FlTQIVjZ3DDZIAAIcAANL72IWJi_8KGo0aL4bBA',
    'CAACAgEAAxkBAAIDoF-DM_dTDSdsx7uo-sjbmQepPIT9AAIbAANL72IW93D7-bIcP8YbBA'
  ];

  return sendSticker(ctx, stickers);
};

const trap = async ctx => {
  const stickers = [
    'CAACAgEAAxkBAAIDpl-DNHR9a_e6Wm5nbDCNrVa_rTCCAAIiAANL72IWEYqdLvsk1lcbBA',
    'CAACAgEAAxkBAAIDpV-DNHISU50VfJ943vPyXKiB7Wj7AAIhAANL72IWNBBA3cU6ycAbBA',
    'CAACAgEAAxkBAAIDpF-DNG8ltcZRAAFj2Jf_7GoVxaUZ4gACIAADS-9iFp-BKRd9tOH4GwQ',
    'CAACAgEAAxkBAAIDo1-DNGyhbTwZ_2Z_HKHf-Ofnt3Q4AAIfAANL72IW8FV2JeUM-RUbBA',
    'CAACAgEAAxkBAAIEI1-UPWHMnVqcZtqAYoIPUePJKrlxAAIlAANL72IWmEnYK6IXdD4bBA'
  ];

  return sendSticker(ctx, stickers);
}

const licence = async ctx => {
  // types: 1 = valido, 2 = temporal, 3 = falsa
  const images = [
    { url: 'https://res.cloudinary.com/jdgn94/image/upload/v1606605380/Waifu%20List%20Bot%20Telegram%20Stickers/licencias/Licencia1_kx1jck.webp', type: 1 },
    { url: 'https://res.cloudinary.com/jdgn94/image/upload/v1606605384/Waifu%20List%20Bot%20Telegram%20Stickers/licencias/Licencia2_pxut7d.webp', type: 1 },
    { url: 'https://res.cloudinary.com/jdgn94/image/upload/v1606605388/Waifu%20List%20Bot%20Telegram%20Stickers/licencias/Licencia3_myrrdo.webp', type: 1 },
    { url: 'https://res.cloudinary.com/jdgn94/image/upload/v1606605382/Waifu%20List%20Bot%20Telegram%20Stickers/licencias/Licencia4_scn3c3.webp', type: 2 },
    { url: 'https://res.cloudinary.com/jdgn94/image/upload/v1606605380/Waifu%20List%20Bot%20Telegram%20Stickers/licencias/Licencia5_noli1c.webp', type: 2 },
    { url: 'https://res.cloudinary.com/jdgn94/image/upload/v1606605384/Waifu%20List%20Bot%20Telegram%20Stickers/licencias/Licencia6_ghah9l.webp', type: 2 },
    { url: 'https://res.cloudinary.com/jdgn94/image/upload/v1606605384/Waifu%20List%20Bot%20Telegram%20Stickers/licencias/Licencia7_tbzrcy.webp', type: 3 },
    { url: 'https://res.cloudinary.com/jdgn94/image/upload/v1606605389/Waifu%20List%20Bot%20Telegram%20Stickers/licencias/Licencia8_ktuo4u.webp', type: 3 },
    { url: 'https://res.cloudinary.com/jdgn94/image/upload/v1606605387/Waifu%20List%20Bot%20Telegram%20Stickers/licencias/Licencia9_duq3wc.webp', type: 3 },
    { url: 'https://res.cloudinary.com/jdgn94/image/upload/v1606605387/Waifu%20List%20Bot%20Telegram%20Stickers/licencias/Licencia10_ghh9ep.webp', type: 3 },
    { url: 'https://res.cloudinary.com/jdgn94/image/upload/v1606605389/Waifu%20List%20Bot%20Telegram%20Stickers/licencias/Licencia11_fgqqul.webp', type: 3 },
    { url: 'https://res.cloudinary.com/jdgn94/image/upload/v1606605390/Waifu%20List%20Bot%20Telegram%20Stickers/licencias/Licencia12_vap92j.webp', type: 3 },
  ];

  return sendLicence(ctx, images);
}

const bye = async ctx => {
  const stickers = [
    'CAACAgEAAxkBAAIH5V_CuEUtuIxzrrK57Fw1Eb8xn4woAAIwAANL72IW0Eb5ymdTaGAeBA'
  ];

  return sendSticker(ctx, stickers, true);
}

const chlorine = async ctx => {
  const stickers = [
    'CAACAgEAAxkBAAIH61_CvTqyxSTfe13nqphP0SWWQ3c2AAIsAANL72IWhV_YxUnXF-UeBA',
    'CAACAgEAAxkBAAIH7F_CvZUpG9nO0Ofh8c3gTOuAk5-IAAItAANL72IWYT-_l6E_EDMeBA',
    'CAACAgEAAxkBAAIH7V_CvaiUb0noJvIsoCs6qoq02DoHAAIuAANL72IWCF9j2iTw5UIeBA',
    'CAACAgEAAxkBAAIH7l_CwEaJEXuNhc2BqKddP-62aqr_AAIxAANL72IWNGv3dx5b2l4eBA'
  ];

  return sendSticker(ctx, stickers, true);
}

const bitchSlap = async ctx => {
  const gifs = [
    'https://res.cloudinary.com/jdgn94/image/upload/v1605032927/Waifu%20List%20Bot%20Telegram%20Gif/Cachetada/tenor_4_dqp3lb.gif',
    'https://res.cloudinary.com/jdgn94/image/upload/v1605032915/Waifu%20List%20Bot%20Telegram%20Gif/Cachetada/tenor_2_qi1444.gif',
    'https://res.cloudinary.com/jdgn94/image/upload/v1605032912/Waifu%20List%20Bot%20Telegram%20Gif/Cachetada/Gzh8yjO_fadymp.gif',
    'https://res.cloudinary.com/jdgn94/image/upload/v1605032815/Waifu%20List%20Bot%20Telegram%20Gif/Cachetada/Whatcha_say_about_my_cooking_ea7350_5456127_dp29g2.gif',
    'https://res.cloudinary.com/jdgn94/image/upload/v1605032788/Waifu%20List%20Bot%20Telegram%20Gif/Cachetada/Kyoukai_Senjou_no_Horizon_II_cmfthh.gif',
    'https://res.cloudinary.com/jdgn94/image/upload/v1605032740/Waifu%20List%20Bot%20Telegram%20Gif/Cachetada/tenor_jcadre.gif',
    'https://res.cloudinary.com/jdgn94/image/upload/v1605032711/Waifu%20List%20Bot%20Telegram%20Gif/Cachetada/tenor_3_lvqses.gif',
    'https://res.cloudinary.com/jdgn94/image/upload/v1605032595/Waifu%20List%20Bot%20Telegram%20Gif/Cachetada/1467219358_wQz6OxI_feiwas.gif',
    'https://res.cloudinary.com/jdgn94/image/upload/v1605032554/Waifu%20List%20Bot%20Telegram%20Gif/Cachetada/tenor_1_ahznkc.gif',
    'https://res.cloudinary.com/jdgn94/image/upload/v1605032520/Waifu%20List%20Bot%20Telegram%20Gif/Cachetada/giphy_xrbjgb.gif',
    'https://res.cloudinary.com/jdgn94/image/upload/v1605032512/Waifu%20List%20Bot%20Telegram%20Gif/Cachetada/d8b_mxeeol.gif',
    'https://res.cloudinary.com/jdgn94/image/upload/v1605032491/Waifu%20List%20Bot%20Telegram%20Gif/Cachetada/slap_3_more_here_wwwyoutubecomusersquabanimeand_here_httpthesquabnestcom_ac9a14_5183773_iprxkx.gif',
    'https://res.cloudinary.com/jdgn94/image/upload/v1605032470/Waifu%20List%20Bot%20Telegram%20Gif/Cachetada/original_zvv6nc.gif',
    'https://res.cloudinary.com/jdgn94/image/upload/v1605032455/Waifu%20List%20Bot%20Telegram%20Gif/Cachetada/d10fbffb944f3f293258936ad24e56f15ec40220_hq_z2eduy.gif',
    'https://res.cloudinary.com/jdgn94/image/upload/v1605032320/Waifu%20List%20Bot%20Telegram%20Gif/Cachetada/Bvou_itfmah.gif',
    'https://res.cloudinary.com/jdgn94/image/upload/v1605032306/Waifu%20List%20Bot%20Telegram%20Gif/Cachetada/1433279248_giphy_b0k2h1.gif',
    'https://res.cloudinary.com/jdgn94/image/upload/v1605032248/Waifu%20List%20Bot%20Telegram%20Gif/Cachetada/5m62_x2m47r.gif',
    'https://res.cloudinary.com/jdgn94/image/upload/v1605032242/Waifu%20List%20Bot%20Telegram%20Gif/Cachetada/5c5f96ebe69eedcce529e65646c411867c05fad5_hq_bjtj7v.gif',
    'https://res.cloudinary.com/jdgn94/image/upload/v1605032175/Waifu%20List%20Bot%20Telegram%20Gif/Cachetada/9b47c4f95b9a93563857dc98eb74a05c_bzhh1g.gif',
    'https://res.cloudinary.com/jdgn94/image/upload/v1605032088/Waifu%20List%20Bot%20Telegram%20Gif/Cachetada/2MrF_wuisns.gif',
    'https://res.cloudinary.com/jdgn94/image/upload/v1605032082/Waifu%20List%20Bot%20Telegram%20Gif/Cachetada/2aa996a717215d90e66c628832982fe5_cfuwyw.gif'
  ];

  return sendAnimationLink(ctx, gifs);
};

module.exports = {
  yaoi,
  plus,
  lgbt,
  gay,
  cross,
  respect,
  police,
  callPolice,
  fbi,
  blood,
  trap,
  licence,
  bye,
  chlorine,
  bitchSlap,
}