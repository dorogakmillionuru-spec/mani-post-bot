const { Client } = require("pg");

const db = new Client({
  connectionString: process.env.DATABASE_URL,
});

db.connect();

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("ok");
  }

  const body = req.body || {};
  const chatId = body?.message?.chat?.id;
  const userText = body?.message?.text || "";

  if (!chatId) {
    return res.status(200).send("no chat");
  }

  try {
    await db.query(
      "insert into messages (telegram_user_id, role, content) values ($1, $2, $3)",
      [String(chatId), "user", userText]
    );
  } catch (e) {
    console.error("DB ERROR:", e);
  }

  return res.status(200).send("ok");
};
