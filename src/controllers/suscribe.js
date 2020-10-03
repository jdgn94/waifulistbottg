const Chat = require('../models/chat');

module.exports = async function (chatId, success, failure) {
  console.log("este es el id del chat que debo subcribir", chatId)
  Chat.findOne({ chatId })
  .then(response => {
    console.log(response);
    if (response != null) {
      console.log("Este chat ya esta registrado");
      return success('Ya se inicio este bot, no es necesario volver a hacerlo');
    }
    // register chat in database
    const chat = new Chat({
      chatId 
    });
    chat.save()
    .then(response => {
      console.log(response);
      return success('Gracias por usar este bot, 100 mensajes escritos en el grupo aparecera un personaje femenino al al que deberas adivinar su nombre, al hacerlo se agregara a tu lista... \nSin mas que decir que comience el juego');
    }).catch(error => {
      console.log("Ocurrio un error inesperado, intentalo mas tarde");
      console.log(error);
      return failure('Ocurrio un error inesperado, intentalo mas tarde');
    });
  }).catch(error => {
    console.log("Ocurrio un error inesperado, intentalo mas tarde");
    console.log(error);
    return faulure('Ocurrio un error inesperado, intentalo mas tarde');
  });
}