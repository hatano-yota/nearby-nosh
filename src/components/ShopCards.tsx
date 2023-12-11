/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useRouter } from 'next/router';

import CommonImage from '@/components/common/CommonImage';
import { Shop } from '@/lib/Shop';

type Props = {
  shops: Shop[];
  isLoading: boolean;
};

const ShopCards = (props: Props): JSX.Element => {
  const router = useRouter();
  const { shops, isLoading } = props;

  const onClickShopCard = (id: string) => {
    void router.push(`/shops/${id}`);
  };

  if (isLoading)
    return (
      <div className="flex h-96 items-center justify-center text-h1 text-gray-300">
        位置情報取得中...
      </div>
    );

  return (
    <>
      {shops ? (
        <div className="mt-5 grid max-w-7xl grid-cols-3 gap-5">
          {shops.map((shop: Shop) => (
            <div
              key={shop.id}
              onClick={() => onClickShopCard(shop.id)}
              className="card card-compact w-96 shadow-xl"
            >
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
      ) : (
        <div className="flex h-96 items-center justify-center">
          <p className="tracking-widest text-gray-400">条件に合う飲食店は見つかりませんでした</p>
        </div>
      )}
    </>
  );
};

export default ShopCards;
