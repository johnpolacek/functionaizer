import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
export const runtime = 'edge';
 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});
 
export async function POST(req: Request) {

  console.log("completion post")
  
  const { prompt, messages, tools } = await req.json();
 
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    stream: true,
    messages: messages ? messages : [
      {
        role: 'user',
        content: prompt,
      },
    ],
    tools,
    temperature: 0,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });
 
  const stream = OpenAIStream(response);
 
  return new StreamingTextResponse(stream);
}