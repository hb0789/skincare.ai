"use client";

import { signOut, signIn, useSession, SessionProvider } from 'next-auth/react'
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  where,
} from "firebase/firestore";
import { db } from "@/app/HOCS/firebase";

export default function AnalysisHistory() {
  const [items, setItems] = useState([]);
  const {data: session, status} = useSession();
  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      const q = query(collection(db, "session"), where("email", "==", session.user.email));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let itemsArr = [];
        querySnapshot.forEach((doc) => {
          itemsArr.push({ ...doc.data(), id: doc.id });
        });
        console.log(itemsArr);
        setItems(itemsArr);
      });
    }
  }, [status, session]);

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "session", id));
  };
  const formatTimestamp = (timestamp) => {
    // This converts timestamp to React readable format. Was giving error otherwise.
    const date = timestamp.toDate();
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    return formattedDate;
  };


  return (
    <main className="flex flex-col items-center justify-between">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm ">
      <h1 className="text-4xl p-4 text-center"> Your Session History<br/> </h1>
        <div className="p-4 rounded-lg">
          <ul className="flex flex-col items-center">
            {items.map((item, id) => (
              <li
                key={id}
                className="my-4 w-full flex justify-between bg-slate-950 text-white"
                style={{ width: "100%" }} // Set li width to 100% to center content
              >
                <div className="p-4 w-full flex justify-between">
                  <span>{item.sid}</span>
                  <span>{formatTimestamp(item.time)}</span>
                  <span>{item.doctor}</span>
                </div>

                <button
                  onClick={() => deleteItem(item.id)}
                  className="p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16"
                >
                  VIEW
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}