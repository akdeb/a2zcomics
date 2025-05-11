"use client";

import Image from "next/image";

export const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-6">
      {/* Cute loading animation */}
      <div className="relative size-32 mb-6">
        <Image
          src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
          alt="Loading animation"
          fill
          className="object-contain"
          priority
        />
      </div>
      
      {/* Loading message */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Your story is being generated
        </h3>
        <p className="text-gray-600">
          Please wait while we create something magical...
        </p>
      </div>
    </div>
  );
};