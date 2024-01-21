import { NextRequest, NextResponse } from "next/server"
import { generateImage } from "../util"
import { increaseUsage } from "@/lib/s3/operations/increaseUsage"

export const runtime = "edge"


export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing env var from OpenAI")
  }
  const { prompt } = await req.json()

  await increaseUsage()

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 })
  }

  const result = await generateImage({
    prompt,
    size: "1024x1024",
    n: 1,
  })
  console.log("image generation complete. result received")
  const images = result.data.map((data: { url: string }) => {
    return data.url
  })

  return NextResponse.json({ image: images[0] })
}
