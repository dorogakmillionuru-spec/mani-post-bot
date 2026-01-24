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

  return res.status(200).send("Толик на связи");
}
