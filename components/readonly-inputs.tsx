import React from 'react';
import { UserInput } from './inputs';

interface ReadOnlyInputsProps {
  userInputs: UserInput[];
}

export const ReadOnlyInputs: React.FC<ReadOnlyInputsProps> = ({ userInputs }) => {
  return (
    <div className="flex flex-col h-full w-full gap-4 font-mono divide-y">
      {userInputs.length > 0 ? (
        userInputs.map((input, index) => (
          <div className="flex gap-2 items-center pt-4 text-sm" key={index}>
            <div className="py-2 px-3 text-gray-600 border border-gray-200 bg-gray-50 rounded">{input.label || "Unnamed Field"}</div>
            <div className={`p-2 italic rounded font-semibold text-gray-500`}>
              {input.type}
            </div>
          </div>
        ))
      ) : (
        <div className="py-2 italic opacity-80">None</div>
      )}
    </div>
  );
};
