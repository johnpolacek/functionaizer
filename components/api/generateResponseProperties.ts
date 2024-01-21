import { UserInput } from "../inputs";
import { ChatCompletionMessageParam, ChatCompletionTool } from "openai/resources/index.mjs";
import { generateData } from "../ai/util";
import { ResponseProperty } from "../properties";

interface ResponsePropertiesResponse {
  properties: ResponseProperty[]
}

export const generateResponseProperties = async (description: string, userInputs: UserInput[]): Promise<ResponsePropertiesResponse> => {

  const messages: ChatCompletionMessageParam[] = [{
    role: "system",
    content:
      `You are an API builder. Provide API response properties based on an API of this description "${description}" and these fields that a user would input: ${JSON.stringify(userInputs)}  - the response properties have a name for the property which should be camel case, a type that can a string, a number or boolean and a description of the property. ALL RESPONSES SHOULD BE VALID JSON!`,
  },
  {
    role: "user",
    content: `Provide response properties for this api: "${description}" - respond only with properly formatted double-quoted JSON data in the form of {properties: {name:string,type:"string" | "number" | "boolean", description: string}[]} -- YOUR RESPONSE SHOULD BE VALID JSON!`,
  }]

  const tools: ChatCompletionTool[] = [
    {
      "type": "function",
      "function": {
        "name": "get_api_response_properties",
        "description": "Provide API response properties based on an API description and fields that a user would input. The response properties have a name for the property which should be camel case, a type that can a string, a number or boolean and a description of the property",
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
  ]

  return generateData(messages, tools)
};
