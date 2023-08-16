import { ReactElement, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import useCreateBars, { shuffleArray } from '../hooks/useCreateBars';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import insertionSort from '../sorting-methods/insertionSort';
import bubbleSort from '../sorting-methods/bubbleSort';

export interface IBarContainer extends HTMLDivElement {
  children: HTMLCollectionOf<HTMLDivElement>;
}

export type SortMethod = (
  containerRef: React.RefObject<IBarContainer>,
  setBars: React.Dispatch<React.SetStateAction<React.ReactElement<HTMLDivElement>[]>>,
  bars: React.ReactElement<HTMLDivElement>[],
  setIsSorting: React.Dispatch<React.SetStateAction<boolean>>
) => void;

const BarContainer = () => {
  const [isSorting, setIsSorting] = useState(false);
  const { bars, setBars } = useCreateBars(30);
  const containerRef = useRef<IBarContainer>(null);

  const handleSort = (sortMethod: SortMethod) => {
    setIsSorting(true);
    sortMethod(containerRef, setBars, bars, setIsSorting);
  };

  const handleShuffle = () => {
    setBars(shuffleArray(bars));
    if (containerRef.current) {
      for (let i = 0; i < bars.length; i++) {
        containerRef.current.children[i].style.backgroundColor = 'white';
      }
    }
  };

  const algorithms = new Map([["Insertion Sort", insertionSort],["Bubble Sort", bubbleSort]]);
  
  const buttons: ReactElement<typeof Button>[] = [];

  algorithms.forEach((algorithm, algorithmName ) => {
    buttons.push(<Button key={algorithmName} disabled={isSorting} onClick={() => {handleSort(algorithm)}} variant='contained'>{algorithmName}</Button>)
  })

  return (
    <>
      <Stack direction={"row"} spacing={2}>
        {buttons}
      </Stack>
      <Box height={'60vh'} width={'90%'} id={'bar-container'} padding={4} ref={containerRef}>
        {bars}
      </Box>
      <Stack spacing={2} direction={'row'} justifyContent={'center'}>
        <Button disabled={isSorting} onClick={handleShuffle}>
          Shuffle
        </Button>
      </Stack>
    </>
  );
};

export default BarContainer;
