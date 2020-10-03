const Waifu = require('../models/waifu');

module.exports = async function () {
  const waifus = [
    {
      name: 'Echidna',
      nickname: '',
      franchise: '5f779c31ae6a9eb67ff58bd7',
      urlImage: 'https://res.cloudinary.com/jdgn94/image/upload/v1601662802/Waifu%20List%20Bot%20Telegram/Echidna_Re-Zero_Kara_Hajimeru_Isekai_Seikatsu_himyhs.png'
    },
    {
      name: 'Ereshkigal',
      nickname: 'Lancer',
      franchise: '5f779c31ae6a9eb67ff58bd8',
      urlImage: 'https://res.cloudinary.com/jdgn94/image/upload/v1601662797/Waifu%20List%20Bot%20Telegram/Ereshkigal_Fate_GO_jqt4xu.jpg'
    },
    {
      name: 'Ishtar',
      nickname: 'Rider',
      franchise: '5f779c31ae6a9eb67ff58bd8',
      urlImage: 'https://res.cloudinary.com/jdgn94/image/upload/v1601662803/Waifu%20List%20Bot%20Telegram/Ishtar_Fate_GO_vfzves.jpg'
    },
    {
      name: 'Tohsaka Rin',
      nickname: '',
      franchise: '5f779c31ae6a9eb67ff58bd9',
      urlImage: 'https://res.cloudinary.com/jdgn94/image/upload/v1601662807/Waifu%20List%20Bot%20Telegram/Rin_Tohsaka_Fate_Stay_Night_v6ihzp.png'
    }
  ];

  await waifus.forEach(async waifu => {
    try {
      await new Waifu({
        name: waifu.name,
        nickname: waifu.nickname,
        franchise: waifu.franchise,
        urlImage: waifu.urlImage
      }).save();
    } catch (error) {
      
    }
  });
}