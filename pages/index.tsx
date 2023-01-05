import Head from 'next/head';

import Button from '@mui/material/Button';
import { ReactElement } from 'react';
import Login from '@/src/components/login/login';

export default function Home() {
  return (
    <>
      <Head>
        <title>ML LOANS | LOGIN</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-neutral-100 flex justify-center items-center min-h-screen">
        <Login />
      </main>
    </>
  );
}

Home.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};
