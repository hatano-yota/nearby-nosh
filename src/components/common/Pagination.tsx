import { useSetRecoilState } from 'recoil';

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
  const CurrentPageNumber = Math.floor((resultsStart - 1) / limit + 1);

  const handleNextPage = () => {
    if (CurrentPageNumber < maxPageNumber) {
      setStart(resultsStart + limit);
    }
  };

  const handlePrevPage = () => {
    if (CurrentPageNumber > 1) {
      setStart(resultsStart - limit);
    }
  };

  return (
    <div className="join my-8 flex w-full justify-center">
      {CurrentPageNumber > 1 && (
        <button className="btn join-item" onClick={handlePrevPage}>
          «
        </button>
      )}

      {maxPageNumber > 1 && <button className="btn join-item">{CurrentPageNumber}</button>}

      {CurrentPageNumber < maxPageNumber && (
        <button className="btn join-item" onClick={handleNextPage}>
          »
        </button>
      )}
    </div>
  );
};

export default Pagination;
