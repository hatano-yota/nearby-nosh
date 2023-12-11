/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useRecoilValue } from 'recoil';

import CommonImage from '@/components/common/CommonImage';
import { useShops } from '@/hooks/api/useShops';
import { locationState } from '@/hooks/atom/location';
import { rangeState } from '@/hooks/atom/range';
import { startState } from '@/hooks/atom/start';
import { Shop } from '@/lib/Shop';

import Pagination from './Pagination';

const ShopCards = (): JSX.Element => {
  const location = useRecoilValue(locationState);
  const range = useRecoilValue(rangeState);
  const start = useRecoilValue(startState);

  const { data, isSWRLoading, isError } = useShops({ ...location, range, start });

  if (isError) return <div>Error fetching data</div>;
  if (isSWRLoading) return <div>Loading...</div>;

  return (
    <>
      {data ? (
        <>
          <div className="mt-5 grid max-w-7xl grid-cols-3 gap-5">
            {data.shops.map((shop: Shop) => (
              <div key={shop.id} className="card card-compact w-96 shadow-xl">
                <figure className="relative h-32 w-full">
                  <CommonImage
                    src={shop.photo.pc.l}
                    alt="店舗のイメージ"
                    className="object-cover"
                    fill
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-base">{shop.name}</h2>
                  <p className="text-xs">{shop.access}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex w-full justify-center">
            <Pagination totalCount={data.totalCount} resultsStart={data.resultsStart} />
          </div>
        </>
      ) : (
        <div className="flex h-96 items-center justify-center">
          <p className="tracking-widest text-gray-400">条件に合う飲食店は見つかりませんでした</p>
        </div>
      )}
    </>
  );
};

export default ShopCards;
