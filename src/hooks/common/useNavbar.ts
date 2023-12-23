import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { keywordState } from '@/hooks/atom/keyword';
import { Location, locationState } from '@/hooks/atom/location';
import { Range, rangeState } from '@/hooks/atom/range';
import { startState } from '@/hooks/atom/start';

type UseNavbarReturn = {
  inputText: string;
  range: number;
  location: Location;
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPressEnterKey: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleRangeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onClickHomeButton: () => void;
};

export const useNavbar = (): UseNavbarReturn => {
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const [range, setRange] = useRecoilState(rangeState);
  const location = useRecoilValue(locationState);
  const setKeyword = useSetRecoilState(keywordState);
  const setStart = useSetRecoilState(startState);

  const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputText(e.target.value);
  };

  const onPressEnterKey: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      setKeyword(inputText);
    }
  };

  const handleRangeChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setRange(Number(e.target.value) as Range);
    setStart(1);
  };

  const onClickHomeButton = () => {
    void router.push('/');
  };

  return {
    inputText,
    range,
    location,
    handleChangeInput,
    onPressEnterKey,
    handleRangeChange,
    onClickHomeButton,
  };
};
