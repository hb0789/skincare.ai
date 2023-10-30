"use client";
import React, { useState, useEffect } from "react";
import "../styles/Navbar.css"
import "../styles/Main.css"
import Navbar from "../main-components/Navbar";
import { useSession } from "next-auth/react";
import AnalysisHistory from "./AnalysisHistory"

export default function Page() {
  const { data: session, status } = useSession();
  return (
    <div className="app-background">
      <Navbar />
      <div className="spacing"></div>
      <AnalysisHistory/>
    </div>
  );
}
