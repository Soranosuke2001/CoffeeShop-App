import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";

import Banner from "@/components/banner";
import Card from "@/components/card";
import useTrackLocation from "@/hooks/use-track-location";
import { fetchCoffeeStores } from "@/lib/fetch-coffeeStores";
import { ACTION_TYPES, storeContext } from "../store/store-context";

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
  const { handleTrackLocation, locationErrorMsg, findingLocation } = useTrackLocation();

  const [coffeeStoresError, setCoffeeStoresError] = useState(null);

  const { dispatch, state } = useContext(storeContext);
  const { coffeeStores, latLong } = state;

  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (latLong) {
        try {
          const res = await fetch(`/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=30`);
          
          const coffeeStores = await res.json();
          
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: {
              coffeeStores
            }
          });

          setCoffeeStoresError(null);
        } catch (error) {
          setCoffeeStoresError(error.message);
        };
      };
    };

    setCoffeeStoresByLocation();
  }, [latLong, dispatch])
  
  const searchShopsHandler = () => {
    handleTrackLocation();
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
          {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
          {coffeeStoresError && <p>Something went wrong: {coffeeStoresError}</p>}
          <div className={styles.heroImage}>
            <Image
              src="/static/hero-image.png"
              width={700}
              height={400}
              alt="hero image"
            />
          </div>
          {coffeeStores.length !== 0 ? (
            <div className={styles.sectionWrapper}>
              <h2 className={styles.heading2}>Stores Near Me</h2>
              <div className={styles.cardLayout}>
                {coffeeStores.map((store) => {
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
          ) : null}
          {props.coffeeStores && coffeeStores.length === 0 && (
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
          )}
        </main>
      </div>
    </React.Fragment>
  );
}
