import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { message } = await req.json();

  const API_KEY = process.env.GEMINI_API_KEY; // Store your API key in .env.local
  const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: message }] }],
      }),
    });

    const data = await response.json();
    const reply = data.candidates[0].content.parts[0].text;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}
