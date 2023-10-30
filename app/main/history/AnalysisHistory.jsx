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
    <main className="flex flex-col items-center min-h-screen">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl mb-6 text-center font-semibold">Your Report History</h1>
        <ul className="w-full">
          <li className="flex justify-between items-center bg-gray-200 p-4 mb-2 rounded-md">
            <span className="w-1/4 font-semibold">Session ID</span>
            <span className="w-1/4 font-semibold">Time</span>
            <span className="w-1/4 font-semibold">Doctor</span>
            <span className="w-1/4 text-center font-semibold">Actions</span>
          </li>
          {items.map((item, id) => (
            <li
              key={id}
              className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-md"
            >
              <span className="w-1/4">{item.sid}</span>
              <span className="w-1/4">{formatTimestamp(item.time)}</span>
              <span className="w-1/4">{item.doctor}</span>
              <button
                onClick={() => deleteItem(item.id)}
                className="w-1/4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-center"
              >
                VIEW
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}