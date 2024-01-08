import { UserInput } from "../inputs";
import untruncateJson from "untruncate-json";
import { formatJSONQuotes } from "./util";

export const generateResponseProperties = async (description: string, userInputs: UserInput[]) => {

 const messages = [{
    role: "system",
    content:
      `You are an API builder. Provide API response properties based on an API of this description "${description}" and these fields that a user would input: ${JSON.stringify(userInputs)}  - the response properties have a name for the property which should be camel case, a type that can a string, a number or boolean and a description of the property. ALL RESPONSES SHOULD BE VALID JSON!`,
  },
  {
    role: "user",
    content: `Provide response properties for this api: "${description}" - respond only with properly formatted double-quoted JSON data in the form of {properties: {name:string,type:"string" | "number" | "boolean", description: string}[]} -- YOUR RESPONSE SHOULD BE VALID JSON!`,
  }]

  const tools = [
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

  console.log(JSON.stringify({
    model: 'gpt-4',
    stream: true,
    messages,
    tools,
    temperature: 0,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  }))
  

  return fetch('/api/completion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ messages, tools })
  })
  .then(response => response.text())
  .then(text => {
    let correctedJson = formatJSONQuotes(text);
    correctedJson = untruncateJson(correctedJson);
    return JSON.parse(correctedJson);
  })
  .then(data => {
    console.log('Success:', data);
    return data;
  })
  .catch((error) => {
    console.error('Error:', error);
    return error
  });
};
