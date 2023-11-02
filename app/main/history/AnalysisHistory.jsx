"use client";

import { signOut, signIn, useSession, SessionProvider } from 'next-auth/react'
import ReportModal from './ReportModal'
import React, { useState, useEffect } from "react";
import {
  Timestamp,
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  getDoc,
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

  const [selectedReport, setSelectedReport] = useState(null);

  const fetchReportDetails = async (id) => {
    try {
      const reportRef = doc(db, "session", id);
      const reportSnapshot = await getDoc(reportRef);
      
      if (reportSnapshot.exists()) {
        // Extract detailed report data from the snapshot and return it
        const detailedReport = {
          id: reportSnapshot.id,
          ...reportSnapshot.data(),
        };
        return detailedReport;
      } else {
        console.log("No such document exists!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching report details: ", error);
      throw error;
    }
  };

  const viewItem = async (id) => {
    // Fetch detailed information based on the 'id' from the database
    const detailedReport = await fetchReportDetails(id); // Implement this function to fetch data from the database

    // Set the selectedReport state to display the modal
    setSelectedReport(detailedReport);
  };

  const closeModal = () => {
    // Close the modal by resetting the selectedReport state
    setSelectedReport(null);
  };

  const formatTimestamp = (timestamp) => {
    if (timestamp instanceof Timestamp) {
      const date = timestamp.toDate();
      const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      return formattedDate;
    }
    return "N/A";
  };
 
  return (
    <main className="flex flex-col items-center min-h-screen">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl mb-6 text-center font-semibold">Your Report History</h1>
        <ul className="w-full">
          <li className="flex justify-between items-center bg-gray-200 p-4 mb-2 rounded-md">
            <span className="w-1/4 font-semibold">Session ID</span>
            <span className="w-1/4 font-semibold">Time</span>
            <span className="w-1/4 font-semibold">Disease</span>
            <span className="w-1/4 text-center font-semibold">Actions</span>
          </li>
          {items.map((item, id) => (
            <li
              key={id}
              className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-md"
            >
              <span className="w-1/4">{item.sid}</span>
              <span className="w-1/4">{formatTimestamp(item.timestamp)}</span>
              <span className="w-1/4">{item.disease}</span>
              <button
                onClick={() => viewItem(item.id)}
                className="w-1/4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 ml-4 rounded-md text-center"
              >
                VIEW
              </button>
            </li>
          ))}
        </ul>
      </div>
      <ReportModal onClose={closeModal} report={selectedReport} />
    </main>
  );
}