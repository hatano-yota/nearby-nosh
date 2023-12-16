/* eslint-disable */
import axios from 'axios';
import useSWR from 'swr';

type Props = {
  lat?: number;
  lng?: number;
  range: number;
  start: number;
};

export const useShops = (props: Props) => {
  const baseApiUrl = `/api/shops`;
  const apiUrl = createApiUrl(baseApiUrl, props);

  const fetcher = (url: string) => axios.get(url, { params: props }).then((res) => res.data);
  const { data, error, isLoading } = useSWR(apiUrl, fetcher);

  return {
    data: data,
    isSWRLoading: isLoading,
    isError: error,
  };
};

const createApiUrl = (baseApiUrl: string, params: Props) => {
  if (!params.lat || !params.lng) return null;

  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      // 値を文字列に変換して追加する
      queryParams.append(key, value.toString());
    }
  });

  return `${baseApiUrl}?${queryParams}`;
};
