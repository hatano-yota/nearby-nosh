import { useSetRecoilState } from 'recoil';

import { startState } from '@/hooks/atom/start';

type UsePagination = (args: { totalCount: number; resultsStart: number }) => {
  maxPageNumber: number;
  currentPageNumber: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
};

const limit = 12;

export const usePagination: UsePagination = (args) => {
  const { totalCount, resultsStart } = args;
  const setStart = useSetRecoilState(startState);

  const maxPageNumber = Math.ceil(totalCount / limit);
  const currentPageNumber = Math.floor((resultsStart - 1) / limit + 1);

  const handleNextPage = () => {
    if (currentPageNumber < maxPageNumber) {
      setStart(resultsStart + limit);
    }
  };

  const handlePrevPage = () => {
    if (currentPageNumber > 1) {
      setStart(resultsStart - limit);
    }
  };

  return {
    maxPageNumber,
    currentPageNumber,
    handleNextPage,
    handlePrevPage,
  };
};
