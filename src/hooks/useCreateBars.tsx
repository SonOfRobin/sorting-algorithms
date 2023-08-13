import { useState, useEffect, ReactElement, CSSProperties } from 'react';

export const shuffleArray = (unshuffledArray: ReactElement<HTMLDivElement>[]) => {
  const shuffledArray = [...unshuffledArray];
  for (let i = unshuffledArray.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ];

  }
  return shuffledArray;
};

export default function useCreateBars(numberOfBars: number) {
  const [bars, setBars] = useState<ReactElement<HTMLDivElement>[]>([]);

  useEffect(() => {

    const newBars: ReactElement<HTMLDivElement>[] = [];

    for (let i = 0; i < numberOfBars; i++) {
      const styleProps: CSSProperties = {
        height: `${((i + 1) / numberOfBars) * 100}%`,
        width: `${(1 / numberOfBars) * 100}%`,
        backgroundColor: 'white',
      };
      newBars.push(<div id={`color-bar${i}`} className='color-bar inactive' key={i} style={styleProps} />);
    }

    setBars(shuffleArray(newBars));
  }, [numberOfBars]);

  return { bars, setBars };
}
