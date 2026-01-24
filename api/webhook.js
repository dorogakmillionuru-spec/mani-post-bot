export default async function handler(req, res) {
  const body = req.body;

  const chatId = body.message.chat.id;
  const text = body.message.text || '';

  await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: `Я живой. Ты написала: ${text}` })
  });

  res.status(200).send('ok');
}
