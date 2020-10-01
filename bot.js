require('dotenv').config();
const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.TOKEN_TG);  // poner el tocken en una variable de entorno

bot.start((ctx) => {
  ctx.reply('Gracias por usar este bot');
  console.log(ctx.chat)
});

bot.command('mamon', (ctx) => {
  ctx.reply('Veeeeeeeeeeeeeeee y que mamon xD');
  console.log(ctx)
})

bot.on('text', () => {

})

bot.launch();