import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import cls from "classnames";

import { fetchCoffeeStores } from "@/lib/fetch-coffeeStores";
import { storeContext } from "../_app";
import { isEmpty } from "@/utils";


import styles from "../../styles/coffee-store.module.css";

export async function getStaticProps({ params }) {
  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoreId = coffeeStores.find((coffeeStore) => {
    return coffeeStore.id.toString() === params.storeId;
  })

  return {
    props: {
      coffeeStore: findCoffeeStoreId ? findCoffeeStoreId : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();

  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        storeId: coffeeStore.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (initialProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const storeId = router.query.storeId;
  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);

  const {
    state: { coffeeStores },
  } = useContext(storeContext);

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStores.length > 0) {
        const findCoffeeStoreId = coffeeStores.find((store) => {
          return store.id.toString() === storeId;
        });
        setCoffeeStore(findCoffeeStoreId);
      };
    }
  }, [storeId]);

  const { name, formatted_address, locality, region, imageURL } = coffeeStore;

  const upvoteButtonHandler = () => {
    console.log("UpVote button was pressed!");
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">← Back to home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            className={styles.storeImg}
            src={imageURL || '/static/404-Not-Found.jpg'}
            alt={`store front image of ${name}`}
            width={600}
            height={360}
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width="24"
              height="24"
              alt="location icon"
            />
            <p className={styles.text}>{formatted_address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/nearMe.svg"
              width="24"
              height="24"
              alt="near me icon"
            />
            <p className={styles.text}>
              {locality} {region}
            </p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width="24"
              height="24"
              alt="star icon"
            />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={upvoteButtonHandler}>
            Upvote
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
