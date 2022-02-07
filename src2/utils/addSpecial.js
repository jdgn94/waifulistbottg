const axios = require('../config/axios');

const addImageSpecialToList = async (extra) => {
  console.log("llegue a la funcion con estos parametros", extra);
  if (extra.newWaifu === false) return;
  
  const body = {
    userId: extra.userId,
    waifuId: extra.waifuId,
    chatId: extra.chatId
  };
  const { status, data } = await axios.post('/special_image/add_special', body);

  console.log(status);
  console.log(data);
  if (status === 200) return { status: 200, message: data };
  return;
}

module.exports = { addImageSpecialToList }