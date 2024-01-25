import { NextRequest, NextResponse } from "next/server"
import { getStream } from "../util"
import { readUsage } from "@/lib/s3/operations/readUsage"

export const runtime = "edge"

// Test with this
// Suggest a setting name, description and intro to an rpg campaign like one for sale at a hobby shop given a genre and keywords
// Sometimes the stream will timeout if you include the function

export async function POST(req: NextRequest) {

  if (process.env.USAGE_LIMIT) {
    const usageData = await readUsage()
    if (usageData.usage > parseInt(process.env.USAGE_LIMIT)) {
      return NextResponse.json({ error: 'Usage limit exceeded' }, { status: 429 })
    }
  }

  const { messages, tools, model } = await req.json()
  
  const stream = await getStream({
    model: model || "gpt-3.5-turbo",
    messages,
    tools,
    stream: true,
  })

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
