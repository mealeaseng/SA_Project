const TelegramBot = require("node-telegram-bot-api");

const token = "YOUR_BOT_TOKEN"; // <-- paste your bot token

const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  bot.sendMessage(msg.chat.id, "Hello! Bot connected.");
});

module.exports = bot;
