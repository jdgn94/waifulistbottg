const express = require("express");
const bot = require("./bot");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);

console.log("listen on port", PORT);

bot.telegram.setWebhook(`${process.env.HEROKU_BASE_URL}/bot${process.env.TOKEN_TG}`);
bot.startWebhook('/webhook', null, PORT);
