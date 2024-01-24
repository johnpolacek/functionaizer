import { UserInput } from "./inputs";
import { ResponseProperty } from "./properties";

interface GetOpenAIFunctionParams {
  apiDescription: string;
  userInputs: UserInput[];
  responseProperties: ResponseProperty[];
}

export const getOpenAIFunction = ({
  apiDescription,
  userInputs,
  responseProperties,
}: GetOpenAIFunctionParams) => {
  return `openai.chat.completions.create({
  model: 'gpt-4',
  stream: true,
  messages: [
    {
      role: "system",
      content: "You are an API that does the following: ${apiDescription} - you will be supplied with parameters of ${userInputs.map((input) => input.label).join(', ')}"
    },
    {
      role: "user",
      content: "You are an API that does the following: ${apiDescription} - Provided these parameters "+JSON.stringify(body.params)+" - respond only with JSON data in the form of {${responseProperties.map((property) => (`${property.name}:"${property.type}"`))}} - YOU MUST RESPOND WITH VALID JSON ONLY!"
    }
  ],
  tools: [
    {
      "type": "function",
      "function": {
        "name": "get_api_response",
        "description": "You are an API that does the following: ${apiDescription} - you will be supplied with parameters of ${userInputs.map((input) => input.label).join(', ')}",
        "parameters": {
          "type": "object",
          "properties": {
            ${responseProperties.map((property) => (`{
              "${property.name}": {
                type: "${property.type}"
              }
            },`))}
          },
          "required": [${responseProperties.map((property) => `"${property.name}"`).join(",")}]
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
