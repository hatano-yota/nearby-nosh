import { useRecoilValue } from 'recoil';

import { rangeState } from '@/hooks/atom/range';

type Props = {
  totalCount: number;
};

const rangeMap = {
  1: 300,
  2: 500,
  3: 1000,
  4: 2000,
  5: 3000,
};

const ShopsFilter = (props: Props): JSX.Element => {
  const { totalCount = 0 } = props;
  const range = useRecoilValue(rangeState);

  return (
    <>
      <h1 className="text-h1">
        &quot;{rangeMap[range]} m&quot; 以内の
        <br />
        レストラン
      </h1>
      <h2 className="mt-8 text-h2">{totalCount} 件の結果</h2>
      <h2 className="mt-8 text-h2">並べ替え</h2>
      <h2 className="mt-8 text-h2">絞り込み</h2>
    </>
  );
};

export default ShopsFilter;
