import { SortMethod } from '../components/BarContainer';
import colorize from '../utilities/colorize';
import pauseFunction from '../utilities/pauseFunction';

const bubbleSort: SortMethod = async (parentNode, setBars, bars, setIsSorting) => {

  if (parentNode.current) {
    const firstChild = parentNode.current.children[0];
    const newBars = [...bars];

    firstChild.style.backgroundColor = colorize(firstChild, newBars.length)

    for (let i = 0; i < newBars.length - 1; i++) {
      let swapped = false;

      for (let j = 0; j < newBars.length - i - 1; j++) {
        const key = parentNode.current.children[j];
        [key.className, key.style.backgroundColor] = [key.className.replace('inactive', 'active'), colorize(key, newBars.length)]
        await pauseFunction(50);
        if (parseFloat(key.style.height) > parseFloat(parentNode.current.children[j + 1].style.height)) {
          [newBars[j], newBars[j + 1]] = [newBars[j + 1], newBars[j]]
          swapped = true;
          setBars([...newBars]);
          await pauseFunction();
        }
        key.className = key.className.replace('active', 'inactive');
        await pauseFunction();
      }
      parentNode.current.children[i].style.backgroundColor = colorize(parentNode.current.children[i], newBars.length)
      if (!swapped) break;
    }
  }
  setIsSorting(false);
}

export default bubbleSort;