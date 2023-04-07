import React from "react";
import Head from "next/head";
import Image from "next/image";

import Banner from "@/components/banner";
import Card from "@/components/card";
import coffeeStoresJSON from "../data/coffee-stores.json";

import styles from "@/styles/Home.module.css";

export async function getStaticProps(context) {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "fsq3e73jZKnoWFKrvpwbHVZGc9a3s9TNcPARsBqBIv/vqeM=",
    },
  };

  const response = await fetch(
    "https://api.foursquare.com/v3/places/search?query=coffee&ll=43.653833032607096%2C-79.37896808855945&limit=6",
    options
  );

  const data = await response.json();

  return {
    props: {
      coffeeStores: data.results,
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
