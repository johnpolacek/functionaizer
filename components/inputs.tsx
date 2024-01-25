import React, { useState, useEffect } from 'react';
import { useAppContext } from './context/AppContext';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface UserInput {
  label: string;
  type: "string" | "number";
}

interface InputsProps {
  userInputs: UserInput[];
}

const newUserInput: UserInput = {
  label: "",
  type: "string"
}

export const Inputs = () => {
  const { userInputs, setUserInputs } = useAppContext(); // Use the context
  const handleInputChange = (index: number, value: string) => {
    const newInputs = userInputs.map((input, i) => (
      i === index ? { ...input, label: value } : input
    ));
    setUserInputs(newInputs); // Update context
  };

  const handleSelectChange = (index: number, value: "string" | "number") => {
    const newInputs = userInputs.map((input, i) => (
      i === index ? { ...input, type: value } : input
    ));
    setUserInputs(newInputs); // Update context
  };

  const handleRemoveInput = (index: number) => {
    const newInputs = userInputs.filter((_, i) => i !== index);
    setUserInputs(newInputs); // Update context
  };

  return (
    <div className="flex flex-col h-full w-full gap-4 ">
      {
        userInputs.length ? (
          userInputs.map((input, index) => (
            <div className="flex gap-2" key={index}>
              <Input placeholder="Field Label" value={input.label} onChange={(e) => handleInputChange(index, e.target.value)} />
              <Select value={input.type} defaultValue="string" onValueChange={(value: "string" | "number") => handleSelectChange(index, value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="string">string</SelectItem>
                  <SelectItem value="number">number</SelectItem>
                </SelectContent>
              </Select>
              <Button className="text-red-600 px-4 hover:text-red-500" variant="ghost" onClick={() => handleRemoveInput(index)}>×</Button>
            </div>
          ))
        ) : (
          <div className="py-2 italic opacity-80">None</div>
        )
      }
      <div>
        <Button className="bg-blue-500" onClick={() => {
          const newInputs = [...userInputs, newUserInput]
          setUserInputs(newInputs)
        }} size="sm">+ Add User Input</Button>
      </div>
    </div>
  );
};

Inputs.displayName = 'Inputs';