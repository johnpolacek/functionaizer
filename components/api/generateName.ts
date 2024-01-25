import { generateData } from "../ai/util";
import { ChatCompletionMessageParam, ChatCompletionTool } from "openai/resources/index.mjs";

interface NameResponse {
  name: string;
}

export const generateName = async (description: string): Promise<NameResponse> => {

 const messages: ChatCompletionMessageParam[] = [{
    role: "system",
    content:
      "You are an API name generator that responds with a suggestion for a cool name for an API based on a description of the API.",
  },
  {
    role: "user",
    content: `Provide a name for this api: "${description}" - respond only with JSON data in the form of {name:string} - YOU MUST RESPOND WITH VALID JSON ONLY!`,
  }]

  const tools: ChatCompletionTool[] = [
    {
      "type": "function",
      "function": {
        "name": "get_api_user_inputs",
        "description": "Get user input field labels recommended for an api based on a description",
        "parameters": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "Name for an api based on a description"
            },
          },
          "required": ["name"]
        }
      }
    }
  ]
  
  return generateData(messages)
};
