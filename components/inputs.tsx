import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
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

export const Inputs = forwardRef<{ getCurrentState: () => UserInput[] }, InputsProps>(
  ({ userInputs }, ref) => {

    const [ inputs, setInputs ] = useState<UserInput[]>([])

    useImperativeHandle(ref, () => ({
      getCurrentState: () => inputs
    }));

    useEffect(() => {
      if (userInputs) setInputs(userInputs)
    }, [userInputs])

    const handleInputChange = (index: number, value: string) => {
      const newInputs = inputs.map((input, i) => (
        i === index ? { ...input, label: value } : input
      ));
      setInputs(newInputs);
    };

    const handleSelectChange = (index: number, value: "string" | "number") => {
      const newInputs = inputs.map((input, i) => (
        i === index ? { ...input, type: value } : input
      ));
      setInputs(newInputs);
    };

    const handleRemoveInput = (index: number) => {
      const newInputs = inputs.filter((_, i) => i !== index);
      setInputs(newInputs);
    };

    return (
      <div className="flex flex-col h-full w-full gap-4 ">
        {
          inputs.length ? (
            inputs.map((input, index) => (
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
            const newInputs = [...inputs, newUserInput]
            setInputs(newInputs)
          }} size="sm">+ Add User Input</Button>
        </div>
      </div>
    );
  }
);

Inputs.displayName = 'Inputs';