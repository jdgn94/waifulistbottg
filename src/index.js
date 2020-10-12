if (process.env.NODE_ENV == 'development') require('dotenv').config();
const express = require("express");
const bot = require("./bot");

const TOKEN_TG = process.env.TOKEN_TG;
const HEROKU_BASE_URL = process.env.HEROKU_BASE_URL;
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send();
});

// app.listen(PORT);

// console.log("listen on port", PORT);

bot.telegram.setWebhook(`${HEROKU_BASE_URL}/bot${TOKEN_TG}`);
bot.startWebhook('/webhook', null, PORT);

// launch
bot.launch();
