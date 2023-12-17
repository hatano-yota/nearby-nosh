/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import ShopCard from '@/components/ShopCard';
import { Shop } from '@/lib/Shop';

type Props = {
  shops: Shop[];
  isSWRLoading: boolean;
  isError: boolean;
};

const ShopCards = (props: Props): JSX.Element => {
  const { shops, isSWRLoading, isError } = props;

  return (
    <>
      {shops && shops.length > 0 ? (
        <div className="mt-5 grid max-w-7xl grid-cols-3 gap-5">
          {shops.map((shop: Shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      ) : shops && shops.length == 0 ? (
        <div className="flex h-96 items-center justify-center">
          <p className="tracking-widest text-gray-400">
            条件に合致する飲食店は見つかりませんでした
          </p>
        </div>
      ) : isSWRLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error fetching data</div>
      ) : (
        <div className="flex h-96 items-center justify-center text-h1 text-gray-300">
          位置情報取得中...
        </div>
      )}
    </>
  );
};

export default ShopCards;
