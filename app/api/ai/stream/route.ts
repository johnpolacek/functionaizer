import { NextRequest, NextResponse } from "next/server"
import { getStream } from "../util"
import { readUsage } from "@/lib/s3/operations/readUsage"

export const runtime = "edge"

export async function POST(req: NextRequest) {

  if (process.env.USAGE_LIMIT) {
    const usageData = await readUsage()
    if (usageData.usage > parseInt(process.env.USAGE_LIMIT)) {
      return NextResponse.json({ error: 'Usage limit exceeded' }, { status: 429 })
    }
  }

  const { messages, tools } = await req.json()
  
  const stream = await getStream({
    model: "gpt-4",
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
