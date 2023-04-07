import React from "react";
import Head from "next/head";
import Image from "next/image";

import Banner from "@/components/banner";
import Card from "@/components/card";
import coffeeStoresJSON from "../data/coffee-stores.json";

import styles from "@/styles/Home.module.css";

export async function getStaticProps(context) {
  return {
    props: {
      coffeeStores: coffeeStoresJSON,
    },
  };
}

export default function Home(props) {
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
          {props.coffeeStores.length !== 0 ? (
            <>
              <h2 className={styles.heading2}>Toronto Stores</h2>
              <div className={styles.cardLayout}>
                {props.coffeeStores.map((coffeeStore) => {
                  return (
                    <Card
                      key={coffeeStore.id}
                      className={styles.card}
                      hrefLink={`/coffee-store/${coffeeStore.id}`}
                      shopName={coffeeStore.name}
                      imageURL={coffeeStore.imgUrl}
                    />
                  );
                })}
              </div>
            </>
          ) : <h2 className={styles.heading2}>There were no coffee shops found in the area</h2>}
        </main>
      </div>
    </React.Fragment>
  );
}
