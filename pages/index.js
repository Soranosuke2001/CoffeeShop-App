import React from "react";
import Head from "next/head";
import Image from "next/image";

import Banner from "@/components/banner";
import Card from "@/components/card";
import { fetchCoffeeStores } from "@/lib/fetch-coffeeStores";

import styles from "@/styles/Home.module.css";
import useTrackLocation from "@/hooks/use-track-location";

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores();

  console.log(coffeeStores)

  return {
    props: {
      coffeeStores,
    },
  };
}

export default function Home(props) {
  const { handleTrackLocation, latLong, locationErrorMsg, findingLocation } = useTrackLocation();

  const searchShopsHandler = () => {
    console.log("button was clicked");
    handleTrackLocation();
    console.log(latLong)

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
            buttonText={findingLocation ? "Locating..." : "View Stores Nearby"}
            searchShops={searchShopsHandler}
          />
          {locationErrorMsg && <p>Something Went Wrong: {locationErrorMsg}</p>}
          <div className={styles.heroImage}>
            <Image
              src="/static/hero-image.png"
              width={700}
              height={400}
              alt="hero image"
            />
          </div>
          {props.coffeeStores ? (
            <div className={styles.sectionWrapper}>
              <h2 className={styles.heading2}>Toronto Stores</h2>
              <div className={styles.cardLayout}>
                {props.coffeeStores.map((store) => {
                  return (
                    <Card
                      key={store.id}
                      className={styles.card}
                      hrefLink={`/coffee-store/${store.id}`}
                      shopName={store.name}
                      imageURL={store.imageURL}
                    />
                  );
                })}
              </div>
            </div>
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
