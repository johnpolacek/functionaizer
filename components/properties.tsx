import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from './ui/textarea';
import { Button } from '@/components/ui/button';

export interface ResponseProperty {
  name: string;
  type: "string" | "boolean" | "number";
  description: string;
}

interface PropertiesProps {
  responseProperties: ResponseProperty[] | undefined;
}

const newProperty: ResponseProperty = {
  name: "",
  type: "string",
  description: ""
}

export const Properties = forwardRef<{ getCurrentState: () => ResponseProperty[] }, PropertiesProps>(
  ({ responseProperties }, ref) => {
    const [ properties, setProperties ] = useState<ResponseProperty[]>([newProperty]);

    useImperativeHandle(ref, () => ({
      getCurrentState: () => properties
    }));

    useEffect(() => {
      if (responseProperties) setProperties(responseProperties)
    }, [responseProperties])

    const handleNameChange = (index: number, value: string) => {
      const newProperties = properties.map((property, i) => (
        i === index ? { ...property, name: value } : property
      ));
      setProperties(newProperties);
    };

    const handleTypeChange = (index: number, value: string) => {
      if (value === "string" || value === "boolean" || value === "number") {
        const newProperties = properties.map((property, i) => (
          i === index ? { ...property, type: value as ResponseProperty['type'] } : property
        ));
        setProperties(newProperties);
      }
    };

    const handleDescriptionChange = (index: number, value: string) => {
      const newProperties = properties.map((property, i) => (
        i === index ? { ...property, description: value } : property
      ));
      setProperties(newProperties);
    };

    const handleRemoveProperty = (index: number) => {
      const newProperties = properties.filter((_, i) => i !== index);
      setProperties(newProperties);
    };

    return (
      <div className="flex flex-col gap-4">
        {
          properties.map((property, index) => (
            <div className="flex gap-2" key={index}>
              <div className="grow grid grid-cols-3 gap-4">
                <Input
                  className="col-span-2"
                  value={property.name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  placeholder="Name"
                />
                <Select value={property.type} onValueChange={(value) => handleTypeChange(index, value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="string">String</SelectItem>
                    <SelectItem value="boolean">Boolean</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  className="col-span-3"
                  value={property.description}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                  placeholder="Description"
                />
              </div>
              {
                properties.length > 1 && (<Button className="text-red-600 px-4 hover:text-red-500" variant="ghost" onClick={() => handleRemoveProperty(index)}>×</Button>)
              }
            </div>
          ))
        }
        <div>
          <Button size="sm" className="bg-blue-500" onClick={() => setProperties([...properties, newProperty])}>+ Add Property</Button>
        </div>
      </div>
    );
  }
);

Properties.displayName = "Properties"