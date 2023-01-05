import { NextPage } from 'next';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import NavigationLayout from '@/src/layouts/navigationLayout';

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  if (Component.getLayout) {
    return Component.getLayout(
      <>
        <Component {...pageProps} />
      </>
    );
  }

  return (
    <>
      <NavigationLayout>
        <Component {...pageProps} />
      </NavigationLayout>
    </>
  );
}

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
