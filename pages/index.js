import React from "react";
import Head from "next/head";
import Image from "next/image";

import Banner from "@/components/banner";
import Card from "@/components/card";
import { fetchCoffeeStores } from "@/lib/fetch-coffeeStores";

import styles from "@/styles/Home.module.css";

export async function getStaticProps(context) {
  
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
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
                      key={coffeeStore.fsq_id}
                      className={styles.card}
                      hrefLink={`/coffee-store/${coffeeStore.fsq_id}`}
                      shopName={coffeeStore.name}
                      // imageURL={coffeeStore.imgUrl}
                      imageURL="https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <h2 className={styles.heading2}>
              There were no coffee shops found in the area
            </h2>
          )}
        </main>
      </div>
    </React.Fragment>
  );
}
