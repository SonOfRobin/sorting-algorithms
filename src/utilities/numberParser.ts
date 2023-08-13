export default function numberParser(fullString: string) {
  
  for (let i = 0; i < fullString.length; i++) {
    if (parseInt(fullString[i])) return parseInt(fullString.substring(i))
  }
  return -1
}