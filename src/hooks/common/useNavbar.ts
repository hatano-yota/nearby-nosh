import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { Location, locationState } from '@/hooks/atom/location';
import { Range, rangeState } from '@/hooks/atom/range';
import { startState } from '@/hooks/atom/start';

type UseNavbarReturn = {
  range: number;
  location: Location;
  handleRangeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onClickHomeButton: () => void;
};

export const useNavbar = (): UseNavbarReturn => {
  const router = useRouter();
  const [range, setRange] = useRecoilState(rangeState);
  const location = useRecoilValue(locationState);
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
    location,
    handleRangeChange,
    onClickHomeButton,
  };
};
