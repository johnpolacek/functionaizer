import React from 'react';
import { ResponseProperty } from './properties';

interface ReadOnlyPropertiesProps {
  responseProperties?: ResponseProperty[]
}

export const ReadOnlyProperties: React.FC<ReadOnlyPropertiesProps> = ({ responseProperties }) => {

  if (!responseProperties) return null

  return (
    <div className="flex flex-col h-full w-full gap-4 divide-y">
      {responseProperties.length > 0 ? (
        responseProperties.map((prop, index) => (
          <div key={index}>
            <div className="flex gap-2 items-center pt-4 text-sm font-mono">
              <div className="py-2 px-3 text-gray-600 border border-gray-200 bg-gray-50 rounded">{prop.name}</div>
              <div className={`p-2 italic rounded font-semibold text-gray-500`}>
                {prop.type}
              </div>
            </div>
            <div className="py-4">{prop.description}</div>
          </div>
        ))
      ) : (
        <div className="py-2 italic opacity-80">None</div>
      )}
    </div>
  );
};
