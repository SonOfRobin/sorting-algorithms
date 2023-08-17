import numberParser from "./numberParser";

const colorize = ({id}: HTMLDivElement, numberOfBars: number) => {
  return `hsl(${Math.floor(
    ((numberParser(id) + 1) / numberOfBars) * 359
  )}, 100%, 50%)`;
}

export default colorize;