import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { UserInput } from './inputs';
import { Input } from './ui/input';
import { ResponseProperty } from './properties';
import { ChatCompletionMessageParam, ChatCompletionTool } from "openai/resources/index.mjs";
import { generateData } from './ai/util';
import Loading from './animation/Loading';
import Code from './ui/code';

interface FunctionProperties {
  [key: string]: { type: string };
}

interface FormData {
    [key: string]: string;
}

export const Demo = ({ apiDescription, userInputs, responseProperties }: { apiDescription: string, userInputs: UserInput[], responseProperties: ResponseProperty[] }) => {
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [apiResponse, setApiResponse] = useState("")

  const handleInputChange = (label: string, value: string) => {
    setFormData(prev => ({ ...prev, [label]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    let interfaceCode = '{';
    let functionProperties: FunctionProperties = {}
    responseProperties.forEach(property => {
      interfaceCode += `  ${property.name}: ${property.type};  `;
      functionProperties[property.name] = {
        type: property.type
      }
    });
    interfaceCode += '}';

    const messages: ChatCompletionMessageParam[] = [
      {
      role: "system",
        content: `You are an API - ${apiDescription}. You respond only with properly formatted double-quoted JSON data in the form of `
      },
      {
        role: "user",
        content: `Provide response properties for this api: "${apiDescription}" - respond only with properly formatted double-quoted JSON data in the shape of this interface: ${interfaceCode} -- YOUR RESPONSE SHOULD BE VALID JSON!`,
      }
    ]
    const tools: ChatCompletionTool[] = [
      {
        type: "function",
        function: {
          name: "get_api_response",
          description: `You are an API that does the following: ${apiDescription} - you will be supplied with parameters of ${userInputs.map((input) => input.label).join(', ')}`,
          parameters: {
            type: "object",
            properties: functionProperties,
            "required": ["properties"]
          }
        }
      }
    ]
    console.log({messages, tools})
    const response = await generateData(messages, tools);
    setApiResponse(JSON.stringify(response, null, 2))
  };

  let data: any = {}
  if (apiResponse) data = JSON.parse(apiResponse)

  return (
    <>
      {
        apiResponse ? (
          <div className="w-full max-w-xl mx-auto p-4">
            <div className="grid grid-cols-2 gap-2 pt-6 pb-8 pl-12 pr-10 border rounded-xl my-4">
              {
                Object.keys(data).map((key) => (
                  <>
                    <div className="text-gray-500 font-light">{key}</div>
                    <div className="font-medium">{data[key].toString()}</div>
                  </>
                ))
              }
            </div>
            <Code language="language-js" code={apiResponse} />
          </div>
        ) : (
          <form className="w-full max-w-xl mx-auto flex flex-col gap-4 my-8 p-8 border rounded-lg" onSubmit={handleSubmit}>
            {
              isSubmitted ? (
                <div className="h-72 w-full flex items-center justify-center">
                  <div className="scale-150">
                    <Loading />
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="font-light text-2xl pb-4 text-center">Try It Out</h2>
                  {userInputs.map((userInput) => (
                    <div key={userInput.label}>
                      <Label>{userInput.label}</Label>
                      <Input
                        type={userInput.type === "number" ? "number" : "text"}
                        name={userInput.label}
                        onChange={(e) => handleInputChange(userInput.label, e.target.value)}
                        required
                      />
                    </div>
                  ))}
                  <div className="flex justify-center gap-4 pt-4">
                    <Button className="px-12" type="submit" size="lg">Submit</Button>
                  </div>
                </>
              )
            }
          </form>
        )
      }
    </>
  );
};
