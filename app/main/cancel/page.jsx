// pages/TransactionCancelled.js

import React from 'react';
import styles from '../cancel/TransactionCancelled.module.css';

const Page = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.cancelledAnimation}>
      <div className={styles.cancelIcon}>&#10060;</div>
        <h1 className={styles.title}>Transaction Cancelled</h1>
        <p className={styles.message}>Your payment was not completed.</p>
      </div>
      <div className={styles.sadEmojiContainer}>
        <div className={styles.sadEmoji}>&#128546;</div>
      </div>
    </div>
  );
};

export default Page;
