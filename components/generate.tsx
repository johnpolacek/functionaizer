import React, { useState } from 'react';
import { Description } from './description';
import { Schema } from './schema';

export const Generate: React.FC = () => {
  const [apiDescription, setApiDescription] = useState("");
  const [showSchema, setShowSchema] = useState(false);

  const handleNextClick = () => setShowSchema(true);

  return (
    <div className="flex flex-col gap-8 px-4">
      {
        showSchema ? (
          <Schema apiDescription={apiDescription} />
        ) : (
          <Description 
            apiDescription={apiDescription} 
            setApiDescription={setApiDescription} 
            onNext={handleNextClick}
          />
        )
      }
    </div>
  );
};
