import React, { useEffect, useState } from 'react';

const useTextReveal = (text: string) => {
  const words = text.split(' ');
  let count = 0;
  const [overflow, setOverflow] = useState('hidden');

  useEffect(() => {
    setTimeout(() => {
      setOverflow('visible');
    }, words.length * 305);
  }, []);

  return (
    <h2 className={`flex flex-wrap text-3xl leading-7 md:text-4xl font-semibold text-center justify-center overflow-${overflow}`}>
      {words.map((word, wordIndex) => (
        <span key={`word-${wordIndex}`} className={`flex overflow-${overflow}`}>
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
