import React from 'react'
import Head from 'next/head'

import Banner from '@/components/banner'

import styles from '@/styles/Home.module.css'

export default function Home() {
  const searchShopsHandler = () => {
    console.log('button was clicked');
  };

  return (
    <React.Fragment>
      <div className={styles.container}>
        <Head>
          <title>Coffee Connoisseur</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className={styles.main}>
          <Banner buttonText={"View Stores Nearby"} searchShops={searchShopsHandler} />
        </main>
      </div>
    </React.Fragment>
  );
};
