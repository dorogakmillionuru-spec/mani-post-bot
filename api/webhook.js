export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("ok");
  }

  const body = req.body || {};
  const chatId = body?.message?.chat?.id;
  const userText = body?.message?.text || "";

  if (!chatId) {
    return res.status(200).send("no chat");
  }

  const reply = `Окей, я понял: ${userText}`;

  await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: reply,
    }),
  });

  return res.status(200).send("ok");
}
