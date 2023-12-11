import CommonImage from '@/components/common/CommonImage';
import { Shop } from '@/lib/Shop';

type Props = {
  shops: Shop[];
};

const ShopCards = (props: Props): JSX.Element => {
  const { shops } = props;

  return (
    <>
      {shops.length != 0 ? (
        <div className="mt-5 grid max-w-7xl grid-cols-3 gap-5">
          {shops.map((shop: Shop) => (
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
      ) : (
        <div className="flex h-96 items-center justify-center">
          <p className="tracking-widest text-gray-400">条件に合う飲食店は見つかりませんでした</p>
        </div>
      )}
    </>
  );
};

export default ShopCards;
