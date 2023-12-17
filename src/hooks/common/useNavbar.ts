import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { Range, rangeState } from '@/hooks/atom/range';
import { startState } from '@/hooks/atom/start';

type UseNavbarReturn = {
  range: number;
  handleRangeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onClickHomeButton: () => void;
};

export const useNavbar = (): UseNavbarReturn => {
  const router = useRouter();
  const [range, setRange] = useRecoilState(rangeState);
  const setStart = useSetRecoilState(startState);

  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRange(Number(e.target.value) as Range);
    setStart(1);
  };

  const onClickHomeButton = () => {
    void router.push('/');
  };

  return {
    range,
    handleRangeChange,
    onClickHomeButton,
  };
};
