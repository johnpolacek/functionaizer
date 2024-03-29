import React, { useState } from 'react';
import { useAppContext } from './context/AppContext';
import { Inputs } from './inputs';
import { ReadOnlyInputs } from './readonly-inputs';
import { Properties } from './properties';
import { ReadOnlyProperties } from './readonly-properties';
import { getOpenAIFunction } from './util';
import { Button } from './ui/button';
import Code from './ui/code';

type SchemaFormProps = {
  apiDescription: string;
};

export const SchemaForm: React.FC<SchemaFormProps> = ({ apiDescription }) => {
  const { userInputs, responseProperties, model, functionCall } = useAppContext();
  const [ editMode, setEditMode ] = useState(false)
  
  return (
    <div className="relative">
      <Button onClick={() => setEditMode(!editMode)} size="sm" variant="outline" className="absolute top-4 right-0">edit</Button>
      <div className="grid gap-6 md:grid-cols-2 py-12 md:border-t">
        <div className="flex flex-col w-full gap-4 md:border-r pr-10">
          <div className="text-xl font-medium">What fields should your users enter?</div>
          {
            editMode ? (
              <Inputs />
            ) : (
              <ReadOnlyInputs userInputs={userInputs} />
            )
          }
        </div>
        <div className="flex flex-col w-full gap-4 pl-4">
          <div className="text-xl font-medium">What should your API respond with?</div>
          {
            editMode ? (
              <Properties />
            ) : (
              <ReadOnlyProperties responseProperties={responseProperties} />
            )
          }
        </div>
      </div>
      <div className="border-t pt-8 sm:p-8">
        <div className="text-4xl font-light text-center pb-8">Your Function</div>
        {
          responseProperties && (<Code language="language-jsx" code={getOpenAIFunction({apiDescription, userInputs, responseProperties, model, functionCall})} />)
        }
      </div>
    </div>
  );
};
