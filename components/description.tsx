import React, { useState } from 'react';
import { Label } from "@/components/ui/label"
import { Textarea } from './ui/textarea';
import { Button } from "@/components/ui/button"
import { getRandomAPI } from './api/getRandomAPI';
import { ArrowPathIcon } from '@heroicons/react/24/solid'

interface DescriptionProps {
  apiDescription: string;
  setApiDescription: (description: string) => void;
  onNext: () => void;
}

export const Description: React.FC<DescriptionProps> = ({ apiDescription, setApiDescription, onNext }) => {

  const [ nextClicked, setNextClicked ] = useState(false)

  const animateText = (text: string) => {
    const words = text.split(' ');
    let index = 0;
    const interval = 10 + Math.ceil(Math.random() * 100);
    let currentText = '';

    const addWord = () => {
      if (index < words.length) {
        currentText += (index === 0 ? '' : ' ') + words[index];
        setApiDescription(currentText);
        index++;
        setTimeout(addWord, interval);
      }
    };

    setApiDescription(''); // Clear existing text
    addWord();
  };

  return (
    <div className="md:w-1/2 mx-auto flex flex-col gap-4 pb-8">
      <Label className="text-3xl text-center font-bold" htmlFor="api-description">What do you want your API to do?</Label>
      <Textarea
        onChange={(e) => setApiDescription(e.target.value)}
        value={apiDescription}
        className="h-16 text-center"
        id="api-description"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            if (apiDescription) {
              onNext();
              setNextClicked(true);
            }
          }
        }}
      />
      {
        !nextClicked && (
          <div className="flex justify-center mt-4 gap-4">
            <Button size="lg" className="bg-fuchsia-500 hover:bg-fuchsia-600 pl-6" onClick={() => {
              animateText(getRandomAPI());
            }}><ArrowPathIcon className="h-6 w-6 text-white mr-2" />Random</Button>
            <Button disabled={!apiDescription} onClick={() => {
              onNext()
              setNextClicked(true)
            }} size="lg">Next »</Button>
          </div>
        )
      }
    </div>
  );
};