import { NextPage } from 'next';
// import { useSession } from 'next-auth/react';
import Head from 'next/head';

// import AccessDenied from '@/components/common/accessDenied';
import Navbar from '@/components/common/Navbar';
import Pagination from '@/components/common/Pagination';
import ShopCards from '@/components/ShopCards';
import ShopsFilter from '@/components/ShopsFilter';
import { useShops } from '@/hooks/useShops';

const Shops: NextPage = () => {
  // const { data: session, loading } = useSession();
  const { shops, totalCount, resultsStart, isSWRLoading, error } = useShops();

  // if (typeof window !== 'undefined' && loading) return null;
  // if (!session) {
  //   console.log(session);
  //   return <AccessDenied />;
  // }

  return (
    <>
      <Head>
        <title>近くの飲食店を探す | NEARBY NOSH</title>
        <meta
          name="description"
          content="『NEARBY NOSH』は、現在地からお近くの飲食店を検索するWebサービスです。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar />
        <div className="flex justify-between">
          <ShopsFilter className="m-8 w-1/4" totalCount={totalCount} />
          <div className="mr-8 mt-8 w-3/4">
            <ShopCards shops={shops} isSWRLoading={isSWRLoading} error={error} />
            <Pagination totalCount={totalCount} resultsStart={resultsStart} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Shops;
