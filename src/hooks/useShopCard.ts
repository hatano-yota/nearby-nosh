import { useRouter } from 'next/router';

import { Shop } from '@/lib/Shop';

type UseShopCard = (args: { shop: Shop }) => {
  onClickShopCard: () => void;
};

export const useShopCard: UseShopCard = (args) => {
  const { shop } = args;
  const router = useRouter();

  const onClickShopCard = () => {
    void router.push(`/shops/${shop.id}`);
  };

  return {
    onClickShopCard,
  };
};
