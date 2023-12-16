import { useShopCard } from '@/hooks/useShopCard';
import { Shop } from '@/lib/Shop';

import CommonImage from './common/CommonImage';

type Props = {
  shop: Shop;
};

const ShopCard = (props: Props): JSX.Element => {
  const { shop } = props;
  const { onClickShopCard } = useShopCard(props);

  return (
    <div onClick={onClickShopCard} className="card card-compact w-96 shadow-xl">
      <figure className="relative h-32 w-full">
        <CommonImage src={shop.photo.pc.l} alt="店舗のイメージ" className="object-cover" fill />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-base">{shop.name}</h2>
        <p className="text-xs">{shop.access}</p>
      </div>
    </div>
  );
};

export default ShopCard;
