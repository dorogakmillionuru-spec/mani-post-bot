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

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
  },
  body: JSON.stringify({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `ТЫ — ТОЛИК. Персональный продюсер мышления и контента.
Ты задаёшь вопросы, показываешь рамки, усиливаешь решения.
Ты не мотивируешь и не продаёшь.`,
      },
      {
        role: "user",
        content: userText,
      },
    ],
  }),
});

const data = await openaiRes.json();
const reply = data.choices[0].message.content;

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
