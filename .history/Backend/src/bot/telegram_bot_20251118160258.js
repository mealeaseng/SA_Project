const TelegramBot = require("node-telegram-bot-api");

const token = "8559555754:AAFvFuiG6PxgCQW-kzVNp6PnpuZkSslXk0U";

const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  bot.sendMessage(msg.chat.id, "Hello! Bot connected.");
});

// Prevent double polling on restart
process.once("SIGINT", () => bot.stopPolling());
process.once("SIGTERM", () => bot.stopPolling());

module.exports = bot;
