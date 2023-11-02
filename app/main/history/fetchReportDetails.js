import { db } from "@/app/HOCS/firebase";
import { doc, getDoc } from "firebase/firestore";

export const fetchReportDetails = async (id) => {
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