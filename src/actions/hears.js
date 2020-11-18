const utils = require('../utils');

const coing = async ctx => {
  const { message } = ctx
  function throwCoin() {
    const number = Math.round(Math.random() * (0 - 1) + 1);
    if (number == 1) return 'cara';
    else return 'cruz'
  }

  return utils.sendMessage(ctx, `@${message.from.username} ha lanzado una moneda y salio ${throwCoin()}.`, { reply_to_message_id: message.message_id });
}

const mamon = async ctx => {
  if (!utils.verifyGroup(ctx)) return;
  const messageId = ctx.message.reply_to_message ? ctx.message.reply_to_message.message_id : null;

  return utils.sendMessage(ctx, 'Veeeeeeeeeeeeeeee y que mamon xD', { reply_to_message_id: messageId});
};

const toInsult = async ctx => {
  if (!utils.verifyGroup(ctx)) return;

  return utils.sendMessage(ctx, 'Secundo la noción de esta agradable persona', { reply_to_message_id: ctx.message.message_id });
}

module.exports = {
  coing,
  mamon,
  toInsult
};