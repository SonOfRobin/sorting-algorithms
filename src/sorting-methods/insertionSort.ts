import { IBarContainer } from "../components/BarContainer";
import numberParser from "../utilities/numberParser";

type ISetBars = React.Dispatch<React.SetStateAction<React.ReactElement<HTMLDivElement>[]>>
type IInsertionSort = (parentNode: React.RefObject<IBarContainer>, setBars: ISetBars, bars: React.ReactElement<HTMLDivElement>[]) => void

const insertionSort:IInsertionSort = async (parentNode, setBars, bars) => {
  
  if (parentNode.current) {
  const firstChild = parentNode.current.children[0];
  const newBars = [...bars];
  
  firstChild.style.backgroundColor = `hsl(${Math.floor(((numberParser(firstChild.id) + 1) / bars.length) * 359)}, 100%, 50%)`
  for (let i = 1; i < bars.length; i++) {
    const key = parentNode.current.children[i];
    key.className = key.className.replace("inactive", "active");
    key.style.backgroundColor = `hsl(${Math.floor(((numberParser(key.id) + 1) / bars.length) * 359)}, 100%, 50%)`;
    // key.style.width = `${(key.scrollWidth) * 4}px`;
    let prevNumIndex = i - 1;
    while (
      prevNumIndex >= 0 &&
      parseFloat(parentNode.current.children[prevNumIndex].style.height) >
        parseFloat(key.style.height)
    ) {
      [newBars[prevNumIndex + 1], newBars[prevNumIndex]] = [
        newBars[prevNumIndex],
        newBars[prevNumIndex + 1],
      ];
      setBars([...newBars]);
      prevNumIndex--;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    newBars[prevNumIndex + 1] = bars[i];
    setBars([...newBars]);
    // key.style.width = firstChild.style.width
    key.className = key.className.replace("active", "inactive");
    await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
}

export default insertionSort;