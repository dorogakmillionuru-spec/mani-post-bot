export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(200).send("ok");
    return;
  }

  const chatId = req.body?.message?.chat?.id;

  if (!chatId) {
    res.status(200).send("no chat");
    return;
  }

  await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: "🐱 Мэни на связи. Завтра будет пост.",
    }),
  });

  res.status(200).send("sent");
}
