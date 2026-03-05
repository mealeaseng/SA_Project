const fetch = require("node-fetch");

const BOT_TOKEN = "8559555754:AAFvFuiG6PxgCQW-kzVNp6PnpuZkSslXk0U";
const CHAT_ID = "1195907606";

async function sendTelegram(message) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const payload = {
    chat_id: CHAT_ID,
    text: message,
    parse_mode: "HTML",
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!data.ok) console.error("Telegram Error:", data.description);
  } catch (err) {
    console.error("Telegram failed:", err.message);
  }
}

module.exports = { sendTelegram };
