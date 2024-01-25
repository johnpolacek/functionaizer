import React, { createContext, useState, useContext } from 'react';
import { UserInput } from '../inputs';
import { ResponseProperty } from '../properties';

interface AppContextType {
  userInputs: UserInput[];
  setUserInputs: React.Dispatch<React.SetStateAction<UserInput[]>>;
  responseProperties: ResponseProperty[];
  setResponseProperties: React.Dispatch<React.SetStateAction<ResponseProperty[]>>;
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

  return (
    <AppContext.Provider value={{ userInputs, setUserInputs, responseProperties, setResponseProperties }}>
      {children}
    </AppContext.Provider>
  );
};
