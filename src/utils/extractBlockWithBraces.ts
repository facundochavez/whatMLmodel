const extractBlockWithBraces = (str: string) => {
  let openBraces = 0;
  let startIndex = -1;
  let endIndex = -1;

  // Recorremos el string carácter por carácter
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "{") {
      if (openBraces === 0) {
        startIndex = i; // Marcamos el inicio del bloque
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
};

export default extractBlockWithBraces;
