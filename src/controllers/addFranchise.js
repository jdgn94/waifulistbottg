const mongoose = require('mongoose');
const Franchise = require('../models/franchise');

module.exports = async function () {
  const franchises = [
    {
      _id: mongoose.Types.ObjectId('5f779c31ae6a9eb67ff58bd7'),
      name: 'Re:Zero Kara Hajimeru Isekai Seikatsu',
      nickname: 'Re:Zero'
    },
    {
      _id: mongoose.Types.ObjectId('5f779c31ae6a9eb67ff58bd8'),
      name: 'Fate Gran Order',
      nickname: 'Fate GO'
    },
    {
      _id: mongoose.Types.ObjectId('5f779c31ae6a9eb67ff58bd9'),
      name: 'Fate Stay Night',
      nickname: ''
    }
  ];

  await franchises.forEach(async franchise => {
    console.log("ciclo agregando la categoria", franchise.name);
    try {
      await new Franchise({
        name: franchise.name,
        nickname: franchise.nickname
      }).save();
    } catch (error) {
      console.log("ocurrio este error", error);
    }
  });
}