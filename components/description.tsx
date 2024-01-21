import React, { useState } from 'react';
import { Label } from "@/components/ui/label"
import { Textarea } from './ui/textarea';
import { Button } from "@/components/ui/button"
import { getRandomAPI } from './api/getRandomAPI';
import { ArrowPathIcon, SparklesIcon } from '@heroicons/react/24/solid'
import FadeInUp from './animation/FadeInUp';
import FadeScaleIn from './animation/FadeScaleIn';
import { cn } from '@/lib/utils';

interface DescriptionProps {
  apiDescription: string;
  setApiDescription: (description: string) => void;
  onNext: () => void;
}

export const Description: React.FC<DescriptionProps> = ({ apiDescription, setApiDescription, onNext }) => {

  const [ nextClicked, setNextClicked ] = useState(false)
  const [ count, setCount ] = useState(0);

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

    setApiDescription('');
    addWord();
  };

  return (
    <div className="md:w-1/2 mx-auto">
      <FadeInUp className="flex flex-col gap-4 pb-8">
        <Label className="text-3xl text-center font-light" htmlFor="api-description">What do you want your API to do?</Label>
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
      </FadeInUp>
      {
        !nextClicked && (
          <div className={cn("flex justify-center mt-4 mx-auto gap-4 duration-500 transition-all", apiDescription ? "w-[20rem]" : "w-[11rem]")}>
            <FadeScaleIn className={cn("flex duration-100 transition-all ease-in-out justify-end", apiDescription ? "w-1/2" : "w-full")} delay={300}>
              <Button size="lg" className="pl-6" onClick={() => {
                setCount(prevCount => prevCount + 1);
                animateText(getRandomAPI());
              }}><ArrowPathIcon style={{transform: `rotate(${count * 180}deg)`}} className="h-6 w-6 text-white mr-2 transition-all duration-700 ease-in-out" />Random</Button>
            </FadeScaleIn>
            <div className={cn("duration-200 transition-all ease-in-out", apiDescription ? "w-1/2" : "w-0")}>
              {
                apiDescription && (
                  <FadeScaleIn delay={200}>
                    <Button className="bg-fuchsia-500 hover:bg-fuchsia-600 duration-1000 pl-6" onClick={() => {
                      onNext()
                      setNextClicked(true)
                    }} size="lg">
                      <SparklesIcon className="h-6 w-6 text-white mr-2" />Functionaize
                    </Button>
                  </FadeScaleIn>
                )
              }
            </div>
          </div>
        )
      }
    </div>
  );
};