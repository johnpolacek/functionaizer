import OpenAI from "openai"
import { ChatCompletionCreateParamsStreaming } from "openai/resources/chat/index.mjs"

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null

export async function getStream(body: ChatCompletionCreateParamsStreaming) {
  if (!openai) {
    return null
  }
  const chatStream = await openai.chat.completions.create(body)

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      for await (const part of chatStream) {
        if (part?.choices) {
          const chunk = part.choices[0]?.delta?.content || part.choices[0]?.delta?.function_call?.arguments || ""
          if (chunk) {
            controller.enqueue(encoder.encode(chunk))
          }
        }
      }
      // Close the controller once all data has been read
      controller.close()
    },
  })

  return stream
}

interface GenerateImageParams {
  prompt: string
  n?: number
  size?: string
  response_format?: string
  user?: string
}

export async function generateImage({ prompt, n, size }: GenerateImageParams) {
  const apiKey = process.env.OPENAI_API_KEY
  const params = {
    prompt,
    n,
    size,
    model: "dall-e-3",
  }
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  }
  const req = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(params),
  }

  try {
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      req
    )

    const result = await response.json()

    if (response.ok) {
      return result
    } else {
      console.log({ result })
      throw new Error(result.error || "Failed to generate image")
    }
  } catch (error) {
    console.error(JSON.stringify(error))
    throw new Error("Failed to generate image")
  }
}
