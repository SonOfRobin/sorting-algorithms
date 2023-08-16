import { SortMethod } from '../components/BarContainer';
import colorize from '../utilities/colorize';
import pauseFunction from '../utilities/pauseFunction';

const insertionSort: SortMethod = async (parentNode, setBars, bars, setIsSorting) => {
  if (parentNode.current) {
    const firstChild = parentNode.current.children[0];
    const newBars = [...bars];

    firstChild.style.backgroundColor = colorize(firstChild, newBars.length);
    for (let i = 1; i < bars.length; i++) {
      const key = parentNode.current.children[i];
      [key.className, key.style.backgroundColor] = [key.className.replace('inactive', 'active'), colorize(key, newBars.length)]
      await pauseFunction(50)
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
        await pauseFunction();
      }
      newBars[prevNumIndex + 1] = bars[i];
      setBars([...newBars]);
      key.className = key.className.replace('active', 'inactive');
      await pauseFunction();
    }
  }
  setIsSorting(false);
};

export default insertionSort;
