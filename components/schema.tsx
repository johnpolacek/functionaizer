import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useAppContext } from './context/AppContext';
import { generateName } from './api/generateName';
import { generateUserInputs } from './api/generateUserInputs';
import { generateResponseProperties } from './api/generateResponseProperties';
import { Demo } from './demo';
import { UserInput } from './inputs';
import { ResponseProperty } from './properties';
import FadeInUp from './animation/FadeInUp';
import { SchemaForm } from './schema-form';
import FadeIn from './animation/FadeIn';
import Loading from './animation/Loading';
import { ApiLogo } from './api-logo';
import { UsageDialog } from './usage-dialog';

export type InputsRef = {
  getCurrentState: () => UserInput[];
};

export type PropertiesRef = {
  getCurrentState: () => ResponseProperty[];
};

export const Schema = ({apiDescription}: {apiDescription: string}) => {
  const { userInputs, setUserInputs, responseProperties, setResponseProperties } = useAppContext();
  const [ lastCalledDescription, setLastCalledDescription ] = useState('');
  const [ usageExceeded, setUsageExceeded ] = useState(false)

  const [ apiName, setApiName ] = useState("")
  
  
  const generateAutomagically = useCallback(async () => {
    if (apiDescription === lastCalledDescription) {
      return; // Exit if this apiDescription has already been processed
    }
    setLastCalledDescription(apiDescription);

    try {
      const apiNameResponse = await generateName(apiDescription);
      if (!apiNameResponse || !apiNameResponse.name) {
        console.error("Invalid response format");
        return [];
      }
      setApiName(apiNameResponse.name)

      const response = await generateUserInputs(apiDescription)
      if (!response || !response.inputs || !response.inputTypes || response.inputs.length !== response.inputTypes.length) {
        console.error("Invalid response format");
        return [];
      }
      const newUserInputs: UserInput[] = response.inputs.map((label: string, index: number) => {
        const type = response.inputTypes[index];
        if (type !== 'string' && type !== 'number') {
          return { label, type: 'string' };
        }
        return { label, type: type as "string" | "number" };
      });
      setUserInputs(newUserInputs)
      
      const response2 = await generateResponseProperties(apiDescription, newUserInputs);
      console.log({response2})
      console.log("setResponseProperties", response2.properties)
      setResponseProperties(response2.properties)

    } catch (error) {
      if (error instanceof Error && error.message.includes('Usage limit exceeded')) {
          setUsageExceeded(true)
      } else {
        console.error('An error occurred:', error);
        if (error instanceof Error) {
          throw error;
        } else {
          throw new Error('An unknown error occurred');
        }
      }
    }

  }, [apiDescription, lastCalledDescription]);

  useEffect(() => {
    if (apiDescription && apiDescription !== lastCalledDescription) {
      generateAutomagically();
    }
  }, [apiDescription, generateAutomagically, lastCalledDescription]);

  return responseProperties?.length ? (
    <div className="flex flex-col gap-12">
      <UsageDialog open={usageExceeded} />
      <ApiLogo name={apiName} description={apiDescription} />
      <FadeInUp className="w-full text-center pt-12 -mb-12">
        <h2 className="font-semibold text-3xl sm:text-5xl text-blue-600 pb-1">{apiName}</h2>
        <h3>{apiDescription}</h3>
      </FadeInUp>
      <FadeInUp delay={200}>
        <Demo apiDescription={apiDescription} userInputs={userInputs} responseProperties={responseProperties} />
      </FadeInUp>
      <FadeIn delay={1000}>
        <SchemaForm  apiDescription={apiDescription} />
      </FadeIn>
    </div>  
  ) : (
    <div className="scale-150"><Loading /></div>
  );
};