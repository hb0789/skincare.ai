"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faCubesStacked,
  faBoxesStacked,
  faCubes,
} from "@fortawesome/free-solid-svg-icons";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "../main-components/Navbar";
import TokenCard from "./TokenCard";
import "./tokencard.css";


const CartDetails = () => {
  const Cardsdata = [
    {
      id: 1,
      dish: "Token 2",
      price: 60,
      qnty: 1,
    },
    {
      id: 2,
      dish: "Token 5",
      price: 120,
      qnty: 1,
    },
    {
      id: 3,
      dish: "Token 10",
      price: 200,
      qnty: 1,
    },
  ];

  // Payment integration
  const makePayment = async (tokens) => {
    const stripe = await loadStripe(
      "pk_test_51O59SISG7DinUUfbH5x5c5lYaqWXHTdzwPTKnqoEfVKEDT6smQIEq6ONIy3VtruNm9E8n2zCgKMbSpuk5nVx6CcE00OVgbaOY7"
    );

    const body = {
      products: [{ dish: `Token ${tokens}`, price: tokens * 20, qnty: 1 }],
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "http://localhost:7000/api/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="spacing-div"></div>
      <div className="token-main">
        <div class="card">
          <div className="token-heading">
            <FontAwesomeIcon icon={faCoins} />
            <br />
            2 tokens
          </div>
          <button className="token-button" onClick={() => makePayment(2)}>
            Purchase
          </button>
        </div>
        <div class="card">
          <div className="token-heading">
            <FontAwesomeIcon icon={faCubes} />
            <br />
            5 tokens
          </div>
          <button className="token-button" onClick={() => makePayment(5)}>
            Purchase
          </button>
        </div>
        <div class="card">
          <div className="token-heading">
            <FontAwesomeIcon icon={faCubesStacked} />
            <br />
            10 tokens
          </div>
          <button className="token-button" onClick={() => makePayment(10)}>
            Purchase
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDetails;