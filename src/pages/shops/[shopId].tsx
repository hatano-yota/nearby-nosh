/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import CommonImage from '@/components/common/CommonImage';
import Navbar from '@/components/common/Navbar';
import { useShop } from '@/hooks/api/useShop';

const ShopDetail: NextPage = () => {
  const router = useRouter();
  const shopId = router.query.shopId as string;
  const { data, isSWRLoading, isError } = useShop({ shopId });

  if (isError) return <div>Error fetching data</div>;
  if (isSWRLoading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />

      <div className="mx-auto mt-5 max-w-5xl">
        <h1 className="text-h1">{data.name}</h1>
        <h3 className="mt-3 text-h2">{data.catchText}</h3>
        <div className="mt-3 flex">
          <figure className="relative h-80 w-1/3">
            <CommonImage src={data.photo.pc.l} alt="店舗のイメージ" className="object-cover" fill />
          </figure>
          <div className="flex w-2/3 items-center justify-center text-h1">Map</div>
        </div>

        <div className="mt-4 flex justify-start border-b border-gray-300 py-2 text-h3">
          <dt className="w-28">住所</dt>
          <dd>{data.address}</dd>
        </div>

        <div className="mt-4 flex justify-start border-b border-gray-300 py-2 text-h3">
          <dt className="w-28">営業時間</dt>
          <dd>{data.open}</dd>
        </div>

        <div className="mt-4 flex justify-start border-b border-gray-300 py-2 text-h3">
          <dt className="w-28">定休日</dt>
          <dd>{data.close}</dd>
        </div>

        <div className="mt-4 flex justify-start border-b border-gray-300 py-2 text-h3">
          <dt className="w-28">クーポン</dt>
          <dd>
            <a href={data.couponUrls.pc}>{data.couponUrls.pc}</a>
          </dd>
        </div>

        <div className="mt-4 flex justify-start border-b border-gray-300 py-2 text-h3">
          <dt className="w-28">予約</dt>
          <dd>
            <a href={data.urls.pc}>{data.urls.pc}</a>
          </dd>
        </div>
      </div>
    </>
  );
};

export default ShopDetail;
