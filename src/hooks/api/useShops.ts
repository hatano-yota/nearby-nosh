/* eslint-disable */
import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useShops = (lat: number, lng: number, range: number) => {
  const apiUrl = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.API_KEY}&lat=${lat}&lng=${lng}&range=${range}&format=json`;
  const { data, error, isLoading } = useSWR(apiUrl, fetcher);

  return {
    shops: data,
    isLoading,
    isError: error,
  };
};
