import React from 'react';

const useTextReveal = (text: string) => {
  const words = text.split(' '); // Divide el texto en palabras
  let count = 0;

  return (
    <h2 className='flex flex-wrap overflow-hidden text-3xl leading-6 md:text-4xl font-semibold text-center justify-center'>
      {words.map((word, wordIndex) => (
        <span key={`word-${wordIndex}`} className='flex overflow-hidden'>
          {word.split('').map((char) => {
            count++;
            return (
              <span
                className='animate-text-reveal [animation-fill-mode:backwards]'
                key={`letter-${count}`}
                style={{
                  animationDelay: `${count * 0.02}s`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
          {wordIndex < words.length - 1 && (
            <span className="after:content-['\00A0']" />
          )}
        </span>
      ))}
    </h2>
  );
};

export default useTextReveal;
