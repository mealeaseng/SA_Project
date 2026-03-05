import fetch from "node-fetch";

const BOT_TOKEN = "8559555754:AAFvFuiG6PxgCQW-kzVNp6PnpuZkSslXk0U";
const CHAT_ID = "1195907606";

export async function sendTelegram(message) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const payload = {
    chat_id: CHAT_ID,
    text: message,
    parse_mode: "HTML",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!data.ok) {
      console.error("❌ Telegram Error:", data.description);
      return null;
    }

    console.log("✅ Telegram Sent!");
    return data;
  } catch (err) {
    console.error("❌ Failed to send:", err.message);
    return null;
  }
}
