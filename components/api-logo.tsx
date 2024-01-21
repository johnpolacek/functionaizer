import React, { useState, useEffect } from "react";
import Image from "next/image";
import Loading from "./animation/Loading";

export function ApiLogo({ name, description }: { name: string; description: string }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    console.log({name, description})
    const fetchData = async () => {
      try {
        const prompt = `Generate a simple vector logo on a white background for an API named ${name} with the description: ${description}`;
        const response = await fetch("/api/ai/image", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setImageUrl(data.image);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };
    if (name && description) {
      fetchData();
    }
  }, [name, description]);

  return (
    <div className="w-full flex justify-center items-center -mb-16 relative top-4 scale-90">
      {
        imageUrl ? (
          <Image className="w-[256px] h-[256px] rounded-full border-4 overflow-hidden" src={imageUrl} width={256} height={256} alt="AI Generated Image" />
        ) : (
          <div className="w-[256px] h-[256px] flex items-center rounded-full border-4 overflow-hidden">
            <Loading />
          </div>
        ) 
      }
    </div>
  )
}
