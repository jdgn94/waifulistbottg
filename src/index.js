const express = require('express');
const serveStatic = require('serve-static');
const bot = require('./bot');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello world");
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('listen on port', port);
bot.launch();