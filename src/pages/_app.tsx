import '@/styles/globals.css';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

import type { AppProps } from 'next/app';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>): JSX.Element {
  return (
    <RecoilRoot>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </RecoilRoot>
  );
}
