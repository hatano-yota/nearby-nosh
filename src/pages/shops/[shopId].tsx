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

  const infoRows = [
    { title: '住所', content: data?.address },
    { title: '営業時間', content: data?.open },
    { title: '定休日', content: data?.close },
    { title: 'クーポン', content: data?.couponUrls.pc, isLink: true },
    { title: '予約', content: data?.urls.pc, isLink: true },
  ];

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

        {infoRows.map((row, index) => (
          <InfoRow key={index} {...row} />
        ))}
      </div>
    </>
  );
};

export default ShopDetail;

type InfoRowProps = {
  title: string;
  content: string;
  isLink?: boolean;
};

const InfoRow = (props: InfoRowProps): JSX.Element => {
  const { title, content, isLink = false } = props;

  return (
    <div className="mt-4 flex justify-start border-b border-gray-300 py-2 text-h3">
      <dt className="w-28">{title}</dt>
      <dd>
        {isLink ? (
          <a className="text-blue-400 hover:opacity-50" href={content}>
            {content}
          </a>
        ) : (
          <span>{content}</span>
        )}
      </dd>
    </div>
  );
};
