if (process.env.NODE_ENV == 'development') require('dotenv').config();
const express = require("express");
const bot = require("./bot");

// const TOKEN_TG = process.env.TOKEN_TG;
const HEROKU_BASE_URL = process.env.HEROKU_BASE_URL;
const PORT = process.env.PORT || 3000;
const PATH_BOT = process.env.PATH_BOT || '/bot_test';

const app = express();

app.use(express.json());

app.get(PATH_BOT, (req, res) => {
  res.send("Hello world");
});


// console.log("listen on port", PORT);

// bot.telegram.setWebhook(`${HEROKU_BASE_URL}/bot${TOKEN_TG}`);
// bot.startWebhook('/webhook', null, PORT);

app.use(bot.webhookCallback(PATH_BOT));
bot.telegram.setWebhook(`${HEROKU_BASE_URL}${PATH_BOT}`);

app.listen(PORT);
// launch
bot.launch();
