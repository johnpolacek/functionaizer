import React from 'react';
import FadeScaleIn from './FadeScaleIn';

const Loading = () => (
  <FadeScaleIn className="pointer-events-none flex justify-center w-full pb-6">
    <div className="grid grid-cols-2 grid-rows-2 w-16 h-16 gap-1 -rotate-45">
      <div className="border-2 scale-50 border-fuchsia-500 animate-ping"></div>
      <div className="border-2 scale-50 border-fuchsia-500 animate-ping delay-300"></div>
      <div className="border-2 scale-50 border-fuchsia-500 animate-ping delay-700"></div>
      <div></div>
    </div>
  </FadeScaleIn>
);

export default Loading;
