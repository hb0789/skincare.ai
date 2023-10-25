
import React from 'react';
import styles from '../sucess/TransactionSuccess.module.css';

const Page = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.containerContent}>
        <div className={styles.verifiedIcon}>&#10003;</div>
        <h1 className={styles.title}>Transaction Successful</h1>
        <p className={styles.message}>Your payment was completed successfully.</p>
      </div>
    </div>
  );
};

export default Page;