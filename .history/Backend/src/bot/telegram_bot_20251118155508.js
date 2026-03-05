const TelegramBot = require("node-telegram-bot-api");

const token = "8559555754:AAEDukGmn2c_yfllTT61diN2C7V5MmGu51Y"; // <-- paste your bot token

const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  bot.sendMessage(msg.chat.id, "Hello! Bot connected.");
});

module.exports = bot;
