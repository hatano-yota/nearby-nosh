import { useSetRecoilState } from 'recoil';
import { mutate } from 'swr';

import { startState } from '@/hooks/atom/start';

type Props = {
  totalCount: number;
  resultsStart: number;
};

const limit = 12;

const Pagination = (props: Props): JSX.Element => {
  const setStart = useSetRecoilState(startState);
  const { totalCount, resultsStart } = props;
  const maxPageNumber = Math.ceil(totalCount / limit);
  const CurrentPageNumber = (resultsStart - 1) / (limit - 1) + 1;

  const handleNextPage = () => {
    if (CurrentPageNumber < maxPageNumber) {
      setStart(resultsStart + limit - 1);
      void mutate('/api/shops', undefined, { revalidate: true });
    }
  };

  const handlePrevPage = () => {
    if (CurrentPageNumber < maxPageNumber) {
      setStart(resultsStart - limit + 1);
      void mutate('/api/shops', undefined, { revalidate: true });
    }
  };

  return (
    <div className="join my-8 flex w-full justify-center">
      {CurrentPageNumber > 1 && (
        <button className="btn join-item" onClick={handlePrevPage}>
          «
        </button>
      )}
      <button className="btn join-item">{CurrentPageNumber}</button>
      {CurrentPageNumber < maxPageNumber && (
        <button className="btn join-item" onClick={handleNextPage}>
          »
        </button>
      )}
    </div>
  );
};

export default Pagination;
