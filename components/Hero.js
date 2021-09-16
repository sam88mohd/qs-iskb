import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Hero = ({ sheets }) => {
  return (
    <div className={styles.hero}>
      <Image
        src="/banner.jpg"
        className={styles.bannerImg}
        layout="fill"
        alt="banner"
      />
      <div className={styles.heroContainer}>
        <div className={styles.heroText}>
          <h1 className={styles.title}>
            QS Daily Response - Ibis Styles Kota Bharu
          </h1>
          <div className={styles.totalCard}>
            <h3>Total</h3>
            <p>{sheets.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
