import React, { useEffect } from 'react';
import { useAppContext } from './context/AppContext';
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from './ui/textarea';
import { Button } from '@/components/ui/button';

export interface ResponseProperty {
  name: string;
  type: "string" | "boolean" | "number";
  description: string;
}

const newProperty: ResponseProperty = {
  name: "",
  type: "string",
  description: ""
}

export const Properties = () => {
  const { responseProperties, setResponseProperties } = useAppContext();

  useEffect(() => {
    if (responseProperties && responseProperties.length > 0) {
      setResponseProperties(responseProperties);
    } else {
      setResponseProperties([newProperty]);
    }
  }, [responseProperties, setResponseProperties]);

  const handleNameChange = (index: number, value: string) => {
    const newProperties = responseProperties.map((property, i) => (
      i === index ? { ...property, name: value } : property
    ));
    setResponseProperties(newProperties);
  };

  const handleTypeChange = (index: number, value: string) => {
    if (value === "string" || value === "boolean" || value === "number") {
      const newProperties = responseProperties.map((property, i) => (
        i === index ? { ...property, type: value as ResponseProperty['type'] } : property
      ));
      setResponseProperties(newProperties);
    }
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const newProperties = responseProperties.map((property, i) => (
      i === index ? { ...property, description: value } : property
    ));
    setResponseProperties(newProperties);
  };

  const handleRemoveProperty = (index: number) => {
    const newProperties = responseProperties.filter((_, i) => i !== index);
    setResponseProperties(newProperties);
  };

  return (
    <div className="flex flex-col gap-4">
      {
        responseProperties.map((property, index) => (
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
              responseProperties.length > 1 && (<Button className="text-red-600 px-4 hover:text-red-500" variant="ghost" onClick={() => handleRemoveProperty(index)}>×</Button>)
            }
          </div>
        ))
      }
      <div>
        <Button size="sm" className="bg-blue-500" onClick={() => setProperties([...responseProperties, newProperty])}>+ Add Property</Button>
      </div>
    </div>
  );
};

Properties.displayName = "Properties"