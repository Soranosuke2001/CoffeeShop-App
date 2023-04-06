import React from "react";
import Head from "next/head";
import Image from "next/image";

import Banner from "@/components/banner";
import Card from "@/components/card";

import styles from "@/styles/Home.module.css";

export default function Home() {
  const searchShopsHandler = () => {
    console.log("button was clicked");
  };

  return (
    <React.Fragment>
      <div className={styles.container}>
        <Head>
          <title>Coffee Connoisseur</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <Banner
            buttonText={"View Stores Nearby"}
            searchShops={searchShopsHandler}
          />
          <div className={styles.heroImage}>
            <Image
              src="/static/hero-image.png"
              width={700}
              height={400}
              alt="hero image"
            />
          </div>
          <Card
            hrefLink="/coffee-store/starbucks"
            shopName="Starbucks"
            imageURL="/static/hero-image.png"
          />
        </main>
      </div>
    </React.Fragment>
  );
}
