import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import cls from "classnames";
import useSWR from "swr";

import { fetchCoffeeStores } from "@/lib/fetch-coffeeStores";
import { storeContext } from "../../store/store-context";
import { isEmpty, fetcher } from "@/utils";

import styles from "../../styles/coffee-store.module.css";

export async function getStaticProps({ params }) {
  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoreId = coffeeStores.find((coffeeStore) => {
    return coffeeStore.id.toString() === params.storeId;
  });

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

  const storeIdQuery = router.query.storeId;
  const [coffeeStore, setCoffeeStore] = useState(
    initialProps.coffeeStore || {}
  );

  const {
    state: { coffeeStores },
  } = useContext(storeContext);

  const newStoreRecord = async (storeInfo) => {
    try {
      const { name, formatted_address, region, locality, voting, imageURL } =
        storeInfo;
      const storeId = storeInfo.id;
      const response = await fetch("/api/createCoffeeStore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          storeId,
          name,
          formatted_address,
          region,
          locality,
          voting: voting || 0,
          imageURL,
        }),
      });

      const dbResponse = response.json();
    } catch (error) {
      throw new Error("Something went wrong: ", error);
    }
  };

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStores.length > 0) {
        const coffeeStoreContext = coffeeStores.find((store) => {
          return store.id.toString() === storeIdQuery;
        });

        if (coffeeStoreContext) {
          setCoffeeStore(coffeeStoreContext);
          newStoreRecord(coffeeStoreContext);
        }
      }
    } else {
      newStoreRecord(initialProps.coffeeStore);
    }
  }, [storeIdQuery, initialProps.coffeeStore, coffeeStores]);

  const {
    name,
    formatted_address,
    locality,
    region,
    imageURL,
  } = coffeeStore;

  const { data, error, isLoading } = useSWR(
    `/api/getCoffeeStoreById?storeId=${storeIdQuery}`,
    fetcher
  );
  const [voteCount, setVoteCount] = useState(0);

  useEffect(() => {
    if (data && data.length > 0 && !isLoading) {
      setCoffeeStore(data[0]);
      setVoteCount(data[0].voting);
    }
  }, [data, isLoading]);

  if (error) {
    return (
      <React.Fragment>
        <h1>There was an error fetching the coffee store data</h1>
        <div>
          <p>Error: {error}</p>
        </div>
      </React.Fragment>
    );
  }

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const upvoteButtonHandler = async () => {
    try {
      const response = await fetch("/api/updateStoreVotes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          storeIdQuery,
        }),
      });

      const dbResponse = await response.json();

      if (dbResponse && dbResponse.length > 0) {
        let count = voteCount + 1;
        setVoteCount(count);
      }
    } catch (error) {
      console.log("Something went wrong: ", error);
    }
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
            src={imageURL || "/static/404-Not-Found.jpg"}
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
            <p className={styles.text}>{voteCount}</p>
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
