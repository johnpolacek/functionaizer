import React, { useState } from 'react';
import { Description } from './description';
import { AppProvider } from './context/AppContext';
import { Schema } from './schema';

export const Generate: React.FC = () => {
  const [apiDescription, setApiDescription] = useState("");
  const [showSchema, setShowSchema] = useState(false);

  const handleNextClick = () => setShowSchema(true);

  return (
    <div className="flex flex-col gap-8 px-4">
      {
        showSchema ? (
          <AppProvider>
            <Schema apiDescription={apiDescription} />
          </AppProvider>
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
