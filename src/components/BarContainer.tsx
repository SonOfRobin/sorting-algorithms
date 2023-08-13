import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import useCreateBars, { shuffleArray } from '../hooks/useCreateBars';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import insertionSort from '../sorting-methods/insertionSort';

export interface IBarContainer extends HTMLDivElement {
  children: HTMLCollectionOf<HTMLDivElement>;
}

const BarContainer = () => {
  const [sorted, setSortState] = useState(false);
  const [isSorting, setIsSorting] = useState(false);
  const { bars, setBars } = useCreateBars(30);
  const containerRef = useRef<IBarContainer>(null);

  const handleSort = () => {
    setIsSorting(true);
    insertionSort(containerRef, setBars, bars);
    setSortState(true);
    setIsSorting(false);
  };

  const handleShuffle = () => {
    setBars(shuffleArray(bars));
    setSortState(false);
    if (containerRef.current) {
      for (let i = 0; i < bars.length; i++) {
        containerRef.current.children[i].style.backgroundColor = 'white';
      }
    }
  };

  return (
    <>
      <Button disabled={isSorting} onClick={handleSort} variant='contained'>
        Insertion Sort
      </Button>
      <Box
        className={sorted ? 'sorted' : 'unsorted'}
        height={'60vh'}
        width={'90%'}
        id={'bar-container'}
        padding={4}
        ref={containerRef}>
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
