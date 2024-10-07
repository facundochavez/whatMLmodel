import useTypingEffect from "@/hooks/useTypingEffect";

interface TypingTextProps {
  text: string;
  wordsInterval: number;
  delay: number;
  disabled: boolean;
  className?: string;
}

const TypingText: React.FC<TypingTextProps> = ({
  text,
  wordsInterval,
  delay,
  disabled,
  className,
}) => {
  const typedText = useTypingEffect(text, wordsInterval, delay, disabled);
  return <p className={className}>{typedText}</p>;
};

export default TypingText;