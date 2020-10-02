require('dotenv').config();
require('./config/database');
const Telegraf = require('telegraf');
const actions = require('./controllers');

const bot = new Telegraf(process.env.TOKEN_TG);  // poner el tocken en una variable de entorno

bot.start(async ctx => {
  const { chat } = ctx;
  console.log(chat)
  if (chat.type == 'group') {
    await actions.subscribe(
      chat.id,
      success => {
        ctx.reply(success);
      },
      failure => {
        ctx.reply(failure);
        // ctx.reply('Gracias por usar este bot, 100 mensajes escritos en el grupo aparecera un personaje femenino al al que deberas adivinar su nombre, al hacerlo se agregara a tu lista... \nSin mas que decir que comience el juego');
      });
  } else {
    ctx.reply('Hola, si quieres que me ponga a trabajar agregame a tu grupo y usa el comando /start para que disfrutar del juego ')
  }
});

bot.command('span', async ctx => {
  await sendWaifu(ctx);
})

bot.command('add', async ctx => {
  await actions.addFranchise();
  console.log("llegue aqui")
});

bot.hashtag('mamon', ctx => {
  ctx.reply('Veeeeeeeeeeeeeeee y que mamon xD');
  console.log(ctx)
})

bot.hashtag(['gay', 'marico'], ctx => {
  ctx.reply('¿Es en serio?\n¿Te vas a dejar decir eso?\nYo siendo tu le parto la boca');
})

bot.on(ctx => {
  console.log("aumentar el contador en la conversacion", ctx.chat, 'solo si es tipo grupo');
})

async function sendWaifu(ctx) {
  ctx.reply('aqui voy a lanzar una waifu para el probar')
}

bot.launch();