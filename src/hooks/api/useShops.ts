/* eslint-disable */
import axios from 'axios';
import useSWR from 'swr';

type Props = {
  lat?: number;
  lng?: number;
  range: number;
};

export const useShops = (props: Props) => {
  const { lat, lng } = props;
  const apiUrl = `/api/shops`;
  const fetcher = (url: string) => axios.get(url, { params: props }).then((res) => res.data);
  const { data, error, isLoading } = useSWR(lat && lng ? apiUrl : null, fetcher);

  return {
    shops: data,
    isSWRLoading: isLoading,
    isError: error,
  };
};
