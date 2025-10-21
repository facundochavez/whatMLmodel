const extractBlockBetweenBraces = (rawText: string) => {
  const start = rawText.indexOf('{');
  if (start === -1) return null;
  return rawText.substring(start).replace(/```json\s*/g, '').replace(/\s*```\s*$/g, '').trim();;
}

export default extractBlockBetweenBraces;

/* const extractBlockBetweenBraces = (str: string) => {
  let openBraces = 0;
  let startIndex = -1;
  let endIndex = -1;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "{") {
      if (openBraces === 0) {
        startIndex = i;
      }
      openBraces++;
    } else if (str[i] === "}") {
      openBraces--;
      if (openBraces === 0) {
        endIndex = i;
        break;
      }
    }
  }

  if (startIndex !== -1 && endIndex !== -1) {
    return str.slice(startIndex, endIndex + 1);
  }

  return null;
}; */

