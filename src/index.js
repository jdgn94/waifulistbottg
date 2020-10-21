if (process.env.NODE_ENV == 'development') require('dotenv').config();
const express = require("express");
const bot = require("./bot");

const TOKEN_TG = process.env.TOKEN_TG;
const HEROKU_BASE_URL = process.env.HEROKU_BASE_URL;
const PORT = process.env.PORT || 3000;
const PATH_BOT = process.env.PATH_BOT || '/bot_test';

const app = express();

app.use(bot.webhookCallback(`/bot${PATH_BOT}`));
bot.telegram.setWebhook(`${HEROKU_BASE_URL}/bot${PATH_BOT}`);

app.get('/', (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log('server on port:', PORT);
});
// launch
bot.launch();
