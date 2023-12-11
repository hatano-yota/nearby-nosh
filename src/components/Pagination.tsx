import { useRouter } from 'next/router';

type Props = {
  totalCount: number;
  resultsStart: number;
};

const limit = 12;

const Pagination = (props: Props): JSX.Element => {
  const router = useRouter();
  const { totalCount, resultsStart } = props;
  const maxPageNumber = Math.ceil(totalCount / limit);
  const CurrentPageNumber = (resultsStart - 1) / (limit - 1) + 1;

  const handleNextPage = () => {
    if (CurrentPageNumber < maxPageNumber) {
      const newStart = resultsStart + limit - 1;
    }
  };

  const handlePrevPage = () => {
    if (CurrentPageNumber < maxPageNumber) {
      const newStart = resultsStart - limit + 1;
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
