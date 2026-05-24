import { useEffect, useMemo, useState } from 'react';

const useTextReveal = (text: string) => {
  const words = useMemo(() => (text ? text.split(' ') : []), [text]);
  const [uniqueKey, setUniqueKey] = useState(0);

  useEffect(() => {
    setUniqueKey((prevKey) => prevKey + 1);
  }, [text]);

  let count = 0;

  return (
    <h2
      key={uniqueKey}
      className="flex flex-wrap text-3xl leading-7 md:text-4xl font-semibold text-center justify-center"
    >
      {words.map((word, wordIndex) => (
        <span key={`word-${wordIndex}`} className="flex">
          {word.split('').map((char) => {
            count++;
            return (
              <span key={`letter-${count}`} className="inline-block overflow-visible align-bottom">
                <span className="inline-block overflow-hidden h-[1.2em] align-bottom leading-none">
                  <span
                    className="inline-block animate-text-reveal [animation-fill-mode:backwards]"
                    style={{
                      animationDelay: `${count * 0.02}s`,
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                </span>
              </span>
            );
          })}
          {wordIndex < words.length - 1 && <span className="after:content-['\00A0']" />}
        </span>
      ))}
    </h2>
  );
};

export default useTextReveal;
