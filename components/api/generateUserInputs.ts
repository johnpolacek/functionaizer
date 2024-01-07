export const generateUserInputs = async (description: string) => {

 const messages = [{
    role: "system",
    content:
      "You are an API builder that recommends human readable labels for fields that a user would input for an API based on a description of the API. The inputs can be either a string, a number or null if there are no user inputs necessary for the API.",
  },
  {
    role: "user",
    content: `Provide user inputs for this api: "${description}" - respond only with JSON data in the form of {inputs: string[],inputTypes:string[]}`,
  }]

  const tools = [
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
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    return data;
  })
  .catch((error) => {
    console.error('Error:', error);
    return error
  });
};
