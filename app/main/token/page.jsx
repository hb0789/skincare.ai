"use client";

import { checkout } from './check/checkout.js';


export default function Home() {
  return (
  <main >
    <div>
    {/* <Image alt='img' className={styles.img}  src="/vercel.svg" width={100} height={50}/> */}
    <button 
     onClick={(()=>{
      checkout(
        {
          lineItems:[{price:"price_1O4LxdSBSFAm6KJ3rAnjTi7G",quantity:1}]
        }
      )
     })}
    >Buy This image</button>
    </div>
  </main>
  )
}