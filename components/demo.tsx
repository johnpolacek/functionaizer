import React, { useState } from 'react';
import { useAppContext } from './context/AppContext';
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { ChatCompletionMessageParam, ChatCompletionTool } from "openai/resources/index.mjs";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import Loading from './animation/Loading';
import Code from './ui/code';
import { generateData } from './ai/util';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

interface FunctionProperties {
  [key: string]: { type: string };
}

interface FormData {
    [key: string]: string;
}

export const Demo = ({ apiDescription }: { apiDescription: string }) => {

  const { model, setModel, functionCall, setFunctionCall, userInputs, responseProperties } = useAppContext();

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
    const tools: ChatCompletionTool[] | undefined = functionCall ? [
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
    ] : undefined;
    const response = await generateData(messages, tools, model);
    setApiResponse(JSON.stringify(response, null, 2))
  };

  let data: any = {}
  if (apiResponse) data = JSON.parse(apiResponse)

  return (
    <>
      {
        apiResponse ? (
          <div className="w-full max-w-xl mx-auto p-4">
            <h2 className="font-light text-2xl py-4 text-center">API Response</h2>
            <div className="flex justify-center">
              <Button onClick={() => {
                setIsSubmitted(false)
                setApiResponse("")
              }}><ArrowPathIcon className="h-4 sm:h-6 w-4 sm:w-6 text-white relative -left-2" />Try Again</Button>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-6 pb-8 pl-12 pr-10 border rounded-xl my-4">
              {
                Object.keys(data).map((key, i) => (
                  <React.Fragment key={i}>
                    <div className="text-gray-500 font-light">{key}</div>
                    <div className="font-medium">{data[key].toString()}</div>
                  </React.Fragment>
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
                  <div className="grid grid-cols-2 gap-16">
                    <Select value={model} onValueChange={(value: "gpt-3.5-turbo" | "gpt-4") => setModel(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Model" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="gpt-3.5-turbo">gpt-3.5-turbo</SelectItem>
                        <SelectItem value="gpt-4">gpt-4</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center justify-end space-x-2 pr-2">
                      <Switch id="function_call"
                        className="cursor-pointer"
                        checked={functionCall}
                        onCheckedChange={() => setFunctionCall(!functionCall)}
                      />
                      <Label className="font-mono" htmlFor="function_call">function_call</Label>
                    </div>
                  </div>
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
