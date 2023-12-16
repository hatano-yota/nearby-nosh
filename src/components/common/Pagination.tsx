import { usePagination } from '@/hooks/common/usePagination';

type Props = {
  totalCount: number;
  resultsStart: number;
};

const Pagination = (props: Props): JSX.Element => {
  const { maxPageNumber, currentPageNumber, handleNextPage, handlePrevPage } = usePagination(props);

  return (
    <div className="join my-8 flex w-full justify-center">
      {/* 前ページがある場合に表示 */}
      {currentPageNumber > 1 && (
        <button className="btn join-item" onClick={handlePrevPage}>
          «
        </button>
      )}

      {/* 2ページ以上ある場合に表示 */}
      {maxPageNumber > 1 && <button className="btn join-item">{currentPageNumber}</button>}

      {/* 次ページがある場合に表示 */}
      {currentPageNumber < maxPageNumber && (
        <button className="btn join-item" onClick={handleNextPage}>
          »
        </button>
      )}
    </div>
  );
};

export default Pagination;
