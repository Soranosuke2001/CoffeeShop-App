import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import coffeeStoresData from "../../data/coffee-stores.json";
import Head from "next/head";

export function getStaticProps({ params }) {
  return {
    props: {
      coffeeStore: coffeeStoresData.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.storeId;
      }),
    },
  };
}

export function getStaticPaths() {
    const paths = coffeeStoresData.map((coffeeStore) => {
        return {
            params: {
                storeId: coffeeStore.id.toString()
            }
        };
    });

  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (props) => {
    const router = useRouter();
    
    if (router.isFallback) {
        return <div>Loading...</div>
    };
    
    const { address, name, neighbourhood, id, imgUrl, websiteUrl } = props.coffeeStore;

  return (
    <React.Fragment>
        <Head>
            <title>{name}</title>
        </Head>
      <Link href="/">Back to home</Link>
      <h1>{id}</h1>
      <p>{address}</p>
      <p>{name}</p>
      <p>{neighbourhood}</p>
    </React.Fragment>
  );
};

export default CoffeeStore;
