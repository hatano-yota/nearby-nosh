/* eslint-disable */
import axios from 'axios';
import useSWR from 'swr';

type Props = {
  lat: number;
  lng: number;
  range: number;
};

export const useShops = (props: Props) => {
  const apiUrl = `/api/shops`;
  const fetcher = (url: string) => axios.get(url, { params: props }).then((res) => res.data);
  const { data, error, isLoading } = useSWR(apiUrl, fetcher);

  return {
    shops: data,
    isLoading,
    isError: error,
  };
};
