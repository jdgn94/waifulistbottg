const mongoose = require('mongoose');

const Schema = mongoose.Schema

const waifuSchema = Schema({
  name: { type: String, require: true },
  nickname: { type: String },
  franchise: { type: String, require: true },
  franchiseShort: { type: String },
  urlImage: { type: String, require: true }
},
{
  timestamps:
  {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

module.exports = mongoose.model('Waifu', waifuSchema);