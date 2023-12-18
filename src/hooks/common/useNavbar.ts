import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { keywordState } from '@/hooks/atom/keyword';
import { Location, locationState } from '@/hooks/atom/location';
import { Range, rangeState } from '@/hooks/atom/range';
import { startState } from '@/hooks/atom/start';

type UseNavbarReturn = {
  keyword: string;
  range: number;
  location: Location;
  handleChangeKeyword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRangeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onClickHomeButton: () => void;
};

export const useNavbar = (): UseNavbarReturn => {
  const router = useRouter();
  const [keyword, setKeyword] = useRecoilState(keywordState);
  const [range, setRange] = useRecoilState(rangeState);
  const location = useRecoilValue(locationState);
  const setStart = useSetRecoilState(startState);

  const handleChangeKeyword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setKeyword(e.target.value);
  };

  const handleRangeChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setRange(Number(e.target.value) as Range);
    setStart(1);
  };

  const onClickHomeButton = () => {
    void router.push('/');
  };

  return {
    keyword,
    range,
    location,
    handleChangeKeyword,
    handleRangeChange,
    onClickHomeButton,
  };
};
