import React, { createContext, useState, useContext } from 'react';
import { UserInput } from '../inputs';
import { ResponseProperty } from '../properties';

interface AppContextType {
  userInputs: UserInput[];
  setUserInputs: React.Dispatch<React.SetStateAction<UserInput[]>>;
  responseProperties: ResponseProperty[];
  setResponseProperties: React.Dispatch<React.SetStateAction<ResponseProperty[]>>;
  model: "gpt-4" | "gpt-3.5-turbo";
  setModel: React.Dispatch<React.SetStateAction<"gpt-4" | "gpt-3.5-turbo">>;
  functionCall: boolean;
  setFunctionCall: React.Dispatch<React.SetStateAction<boolean>>;
}


const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInputs, setUserInputs] = useState<UserInput[]>([]);
  const [responseProperties, setResponseProperties] = useState<ResponseProperty[]>([]);
  const [model, setModel] = useState<"gpt-4" | "gpt-3.5-turbo">("gpt-4");
  const [functionCall, setFunctionCall] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{
      userInputs, setUserInputs, 
      responseProperties, setResponseProperties,
      model, setModel,
      functionCall, setFunctionCall
    }}>
      {children}
    </AppContext.Provider>
  );
};

