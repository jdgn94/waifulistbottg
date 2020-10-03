const mongoose = require('mongoose')
const Chat = require('./chat');
const Waifu = require('./waifu');

const Schema = mongoose.Schema;

const activeSchema = Schema({
  chatId: { type: Schema.Types.ObjectId, ref: 'Chat' },
  attempts: { type: Number, require: true },
  waifu: { type: Schema.Types.ObjectId, ref: 'Waifu' }
},
{
  timestamps:
  {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

module.exports = mongoose.model('Active', activeSchema);