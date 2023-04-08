import styles from "./banner.module.css";

const Banner = (props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee</span>
        <span className={styles.title2}>Connoisseur</span>
      </h1>
      <p className={styles.subtitle}>Discover Your Local Coffee Shops</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={props.searchShops}>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
};

export default Banner;
