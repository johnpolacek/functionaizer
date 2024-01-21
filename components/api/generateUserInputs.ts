import { ChatCompletionMessageParam, ChatCompletionTool } from "openai/resources/index.mjs";
import { generateData } from "../ai/util";

interface UserInputsResponse {
  inputs: string[];
  inputTypes: string[];
}

export const generateUserInputs = async (description: string): Promise<UserInputsResponse> => {

 const messages: ChatCompletionMessageParam[] = [{
    role: "system",
    content:
      "You are an API builder that recommends human readable labels for fields that a user would input for an API based on a description of the API. The inputs can be either a string, a number or null if there are no user inputs necessary for the API.",
  },
  {
    role: "user",
    content: `Provide user inputs for this api: "${description}" - respond only with JSON data in the form of {inputs: string[],inputTypes:string[]}`,
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
            "inputs": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "Field labels recommended for an api based on a description"
            },
            "inputTypes": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": ["string", "number"],
              },
              "description": "Input type of string or number for the corresponding field labels"
            },
          },
          "required": ["inputs","inputTypes"]
        }
      }
    }
  ]
  
  return generateData(messages, tools)
};
