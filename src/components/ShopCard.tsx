import CommonImage from '@/components/common/CommonImage';
import { Shop } from '@/lib/Shop';

type Props = {
  shop: Shop;
};

const ShopCard = (props: Props): JSX.Element => {
  const { shop } = props;

  return (
    <div className="card card-compact w-80 shadow-xl">
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
