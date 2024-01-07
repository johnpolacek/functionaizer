import React, { useState, useRef } from 'react';
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
import { isValidTypeScriptInterface } from './util';
import { generateUserInputs } from './api/generateUserInputs';
import { Inputs, UserInput } from './inputs';
import { Properties, ResponseProperty } from './properties';
import { SparklesIcon } from '@heroicons/react/24/solid'

type InputsRef = {
  getCurrentState: () => UserInput[];
};

type PropertiesRef = {
  getCurrentState: () => ResponseProperty[];
};

export const Schema = ({apiDescription}: {apiDescription: string}) => {
  const inputsRef = useRef<InputsRef>(null);
  const propertiesRef = useRef<PropertiesRef>(null);

  const [ responseSchema, setResponseSchema ] = useState("")
  const generateAutomagically = async () => {
    const response = await generateUserInputs(apiDescription)
    if (!response || !response.inputs || !response.inputTypes || response.inputs.length !== response.inputTypes.length) {
      console.error("Invalid response format");
      return [];
    }
    const newUserInputs = response.inputs.map((label: string, index: number) => {
      const type = response.inputTypes[index];
      if (type !== 'string' && type !== 'number') {
        return { label, type: 'string' }; // Default to 'string' or handle the error as needed
      }
      return { label, type: type as "string" | "number" };
    });
    setUserInputs(newUserInputs)
  }
  const [ userInputs, setUserInputs ] = useState<UserInput[]>([])
  const [ responseProperties, setResponseProperties ] = useState<ResponseProperty[] | undefined>(undefined)

  const handleNextClick = () => {
    const currentInputs = inputsRef.current?.getCurrentState();
    const currentProperties = propertiesRef.current?.getCurrentState();

    console.log('User Inputs:', currentInputs);
    console.log('Response Properties:', currentProperties);
  };

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col w-full gap-4">
          <Label className="text-xl font-semibold" htmlFor="api-schema">What fields should your users enter?</Label>
          <Inputs userInputs={userInputs} ref={inputsRef} />
        </div>
        <div className="flex flex-col w-full gap-4">
          <Label className="text-xl font-semibold" htmlFor="api-schema">What properties should your API respond with?</Label>
          <Properties responseProperties={responseProperties} ref={propertiesRef} />
        </div>
      </div>
      <div className="flex justify-center gap-4 pt-16">
        <Button className="bg-fuchsia-500 hover:bg-fuchsia-600 hover:scale-105 pl-6" onClick={generateAutomagically} size="lg">
          <SparklesIcon className="h-6 w-6 text-white mr-2" />Use AI Magic
        </Button>
        <Button onClick={handleNextClick} disabled={Boolean(responseSchema) && isValidTypeScriptInterface(responseSchema)} size="lg">Next »</Button>
      </div>
    </>
  );
};