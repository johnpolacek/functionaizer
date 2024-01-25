import { ChatCompletionTool, ChatCompletionMessageParam } from "openai/resources/index.mjs"
import untruncateJson from "untruncate-json"

export const getStreamingData = async ({
  prompt,
  messages,
  onData,
  onError,
  onDone,
  model,
  tools,
}: {
  onData: (data: string) => void
  prompt?: string
  messages?: ChatCompletionMessageParam[]
  onError?: () => void
  onDone?: (data: string) => void
  model?: string
  tools?: ChatCompletionTool[]
}) => {
  if (!prompt && !messages) {
    throw new Error("Must provide a prompt or messages")
  }

  let payload = {
    messages: messages || [{ role: "user", content: prompt }],
    model: model || "gpt-3.5-turbo",
    tools,
  }

  const response = await fetch("/api/ai/stream", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...payload,
    }),
  })

  if (response.status === 429) {
    const errorData = await response.json();
    throw new Error(`Usage limit exceeded: ${errorData.error}`);
  }

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const stream = response.body
  if (!stream) {
    console.log("No stream detected")
    if (onError) {
      onError()
    }
    return
  }

  const reader = stream.getReader()
  const decoder = new TextDecoder()
  let done = false
  let responseString = ""

  setTimeout(() => {
    if (responseString === "") {
      console.log("stream response timeout")
      if (onError) {
        onError()
      }
      done = true
      return
    }
  }, 4000)

  while (!done) {
    try {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      responseString += decoder.decode(value)
      onData(responseString)
    } catch (error) {
      console.error("Error reading from stream:", error)
    }
  }

  if (done && onDone) {
    onDone(responseString)
  }
  return
}
 

export const generateData = <T,>(messages: ChatCompletionMessageParam[], tools?: ChatCompletionTool[], model?: "gpt-4" | "gpt-3.5-turbo"): Promise<T> => {
  return new Promise((resolve, reject) => {
    getStreamingData({
      messages,
      tools,
      model,
      onData: (data) => {
        // Process onData if needed
      },
      onDone: (data) => {
        try {
          // First attempt to parse the JSON directly
          const result = JSON.parse(data);
          resolve(result);
        } catch (initialError) {
          console.error('Initial JSON parsing error:', initialError);
          try {
              // If initial parsing fails, try fixing the JSON and parsing again
              let correctedJson = formatJSONQuotes(data);
              correctedJson = untruncateJson(correctedJson);
              console.log(correctedJson);
              const result = JSON.parse(correctedJson);
              resolve(result);
          } catch (secondaryError) {
              console.error('JSON parsing error after corrections:', secondaryError);
              reject(secondaryError);
          }
        }
      },
    });
  });
};

export function formatJSONQuotes(jsonString: string) {
    let inString = false;
    let newJsonString = '';

    for (let i = 0; i < jsonString.length; i++) {
        if (jsonString[i] === '"' && !isEscaped(jsonString, i)) {
            inString = !inString;
        }

        if (jsonString[i] === "'" && !inString && !isEscaped(jsonString, i)) {
            newJsonString += '"';
        } else {
            newJsonString += jsonString[i];
        }
    }

    return newJsonString;
}

function isEscaped(str: string, index: number) {
    let backslashCount = 0;
    index--;

    while (index >= 0 && str[index] === '\\') {
        backslashCount++;
        index--;
    }

    return backslashCount % 2 === 1;
}

