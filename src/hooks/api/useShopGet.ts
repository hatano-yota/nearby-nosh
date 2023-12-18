/* eslint-disable */
import axios from 'axios';
import useSWR from 'swr';

type Props = {
  shopId: string;
};

export const useShopGet = (props: Props) => {
  const { shopId } = props;
  const apiUrl = `/api/shops/${shopId}`;
  const fetcher = (url: string) => axios.get(url, { params: props }).then((res) => res.data);
  const { data, error, isLoading } = useSWR(apiUrl, fetcher);

  return {
    data: data,
    isSWRLoading: isLoading,
    isError: error,
  };
};
