import useTypingEffect from '@/hooks/useTypingEffect';

interface TypingTextProps {
  text: string;
  wordsInterval: number;
  delay: number;
  disabled: boolean;
  className?: string;
  type?: string;
}

const TypingText: React.FC<TypingTextProps> = ({ text, wordsInterval, delay, disabled = false, className, type = 'p' }) => {
  const typedText = useTypingEffect(text, wordsInterval, delay, disabled);
  return type === 'h2' ? <h2 className={className}>{typedText}</h2> : <p className={className}>{typedText}</p>;
};

export default TypingText;
