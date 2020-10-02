const Franchise = require('../models/franchise');

module.exports = async function () {
  const franchises = [
    {
      name: 'Re:Zero Kara Hajimeru Isekai Seikatsu',
      nickname: 'Re:Zero'
    },
    {
      name: 'Fate Gran Order',
      nickname: 'Fate GO'
    },
    {
      name: 'Fate Stay Night',
      nickname: ''
    }
  ];

  await franchises.forEach(async franchise => {
    try {
      await new Franchise({
        name: franchise.name,
        nickname: franchise.nickname
      });
    } catch (error) {
      console.log("ocurrio este error", error);
    }
  });
}