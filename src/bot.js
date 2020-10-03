require('dotenv').config();
require('./config/database');
const Telegraf = require('telegraf');
// const Telegram = require('telegraf/telegram')
const actions = require('./controllers');
const commands = require('./commands');

const Chat = require('./models/chat');

const bot = new Telegraf(process.env.TOKEN_TG);  // poner el tocken en una variable de entorno
// const telegram = new Telegram(process.env.TOKEN_TG)

bot.start(async ctx => {
  const { chat } = ctx;
  console.log(chat)
  if (chat.type == 'group') {
    await actions.subscribe(
      chat.id,
      success => {
        ctx.reply(success);
        sendWaifu(ctx);
      },
      failure => {
        ctx.reply(failure);
      });
  } else {
    ctx.reply('Hola, si quieres que me ponga a trabajar agregame a tu grupo y usa el comando /start para que disfrutar del juego ')
  }
});

bot.command('span', async ctx => {
  await sendWaifu(ctx);
});

bot.command('add', async ctx => {
  await actions.addWaifu();
  console.log("llegue aqui")
});

bot.command('protecc', async ctx => {
  const { message } = ctx;
  const response = await commands.protecc(message);
  if (response == null) return;

  ctx.reply(response, { reply_to_message_id: message.message_id });
});

bot.hashtag('mamon', ctx => {
  ctx.reply('Veeeeeeeeeeeeeeee y que mamon xD', { reply_to_message_id: ctx.message.reply_to_message.message_id });
})

bot.hashtag(['gay', 'marico'], ctx => {
  ctx.reply('¿Es en serio?\n¿Te vas a dejar decir eso?\nYo siendo tu le parto la boca');
});

bot.on(['text', 'sticker', 'image', 'audio', 'video', 'document'], async ctx => {
  if (ctx.chat.type == 'group') {
    const chat = await Chat.findOneAndUpdate({ chatId: ctx.chat.id }, { $inc: { countMessage: 1 }});
    if (chat.countMessage >= chat.limitMessage) sendWaifu(ctx);
  }
});

async function sendWaifu(ctx) {
  const { chat } = ctx;
  const waifu = await actions.searchWaifu(chat.id);
  ctx.replyWithPhoto(
    {
      url: waifu.urlImage,
      filename: 'waifu._id'
    }, {
      caption: 'Aparecio una waifu, tienen un maximo de 10 intentos para descubir quien es, manda el comando /protecc <name o apodo> para agregarla a tu lista'
    }
  );
}

bot.launch();