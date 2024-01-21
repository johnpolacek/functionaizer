import { UserInput } from "./inputs";

interface GetOpenAIFunctionParams {
  apiDescription: string;
  userInputs: UserInput[]
}

export const getOpenAIFunction = ({
  apiDescription,
  userInputs,
}: GetOpenAIFunctionParams) => {
  return `openai.chat.completions.create({
  model: 'gpt-4',
  stream: true,
  messages,
  tools: [
    {
      "type": "function",
      "function": {
        "name": "get_api_response",
        "description": "You are an API that does the following: ${apiDescription} - you will be supplied with parameters of ${userInputs.map((input) => input.label).join(', ')}",
        "parameters": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "items": {
              "type": "string",
              "enum": ["string", "number","boolean"],
            },
            "description": {
              "type": "string"
            },
          },
          "required": ["properties"]
        }
      }
    }
  ],
  temperature: 0,
  top_p: 1,
  frequency_penalty: 1,
  presence_penalty: 1,
})`
};
