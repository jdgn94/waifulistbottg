const subscribe = require('./suscribe')
const addFranchise = require('./addFranchise')

const User = require('../models/user');
const Waifu = require('../models/waifu');
const Active = require('../models/active')
const Francise = require('../models/franchise')
const Chat = require('../models/chat')

const actions = { subscribe, addFranchise };

module.exports = actions;