export default function camelToTitleCase(camelStr: string): string {
  return camelStr
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
}