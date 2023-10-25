"use client"
import { useRouter } from "next/navigation";
import {React,useEffect} from 'react';
import styles from '../cancel/TransactionCancelled.module.css';

const Page = () => {
    const router=useRouter();
    useEffect(() => {
        const redirectTimeout = setTimeout(() => {
          // Redirect to the main page after 2 seconds (replace '/' with your desired route)
          router.push('http://localhost:3000/main');
        }, 5000);
    
        // Clear the timeout when the component unmounts
        return () => {
          clearTimeout(redirectTimeout);
        };
      }, []);
  return (
    <div className={styles.pageContainer}>
      <div className={styles.cancelledAnimation}>
      <div className={styles.cancelIcon}>&#10060;</div>
        <h1 className={styles.title}>Transaction Cancelled</h1>
        <p className={styles.message}>Your payment was not completed.</p>
        <p className={styles.message}>Please wait while we take you to home</p>

      </div>
      <div className={styles.sadEmojiContainer}>
        <div className={styles.sadEmoji}>&#128546;</div>
      </div>
      
      
    </div>
  );
};

export default Page;
