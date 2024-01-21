'use client';
import React, { useState, useEffect } from 'react';
import { Generate } from './generate';

export function Functionaizer() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 3600);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Generate />
    </div>
  );
}
