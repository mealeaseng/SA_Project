const TelegramBot = require("node-telegram-bot-api");

const token = "YOUR_NEW_RESET_TOKEN";

const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  bot.sendMessage(msg.chat.id, "Hello! Bot connected.");
});

// Prevent double polling on restart
process.once("SIGINT", () => bot.stopPolling());
process.once("SIGTERM", () => bot.stopPolling());

module.exports = bot;
