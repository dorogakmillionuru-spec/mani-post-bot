export default async function handler(req, res) {
  const body = req.body;

  const chatId = body.message.chat.id;
  const text = body.message.text || '';

  await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, const userText = req.body.message.text || '';

const reply = `Окей, я понял: ${userText}`;

await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    chat_id: chatId,
    text: reply
  })
}); 
                         })
  });

  res.status(200).send('ok');
}
