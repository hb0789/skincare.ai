"use client"

import React, { useEffect, useState } from 'react'

import { loadStripe } from '@stripe/stripe-js';
import Navbar from '../main-components/Navbar';
import TokenCard from './TokenCard'
import './tokencard.css';


const CartDetails = () => {

   
    const Cardsdata = [
        {
            id: 1,
            dish: "Token 10",
            price: 350,
            qnty:1
        }
    ];
    






    // payment integration
    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51O4LbwSBSFAm6KJ38hlzPSvpDqUjMfKxaBmku3Z2wBRNm51F4uqSHNu5m8XBMdZC5WaUxsEjq7eeIKYspmsowgkQ00fTolQx1X");

        const body = {
            products: Cardsdata 
        }
        const headers = {
            "Content-Type": "application/json"
        }
        const response = await fetch("http://localhost:7000/api/create-checkout-session", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });

        const session = await response.json();

        const result = stripe.redirectToCheckout({
            sessionId: session.id
        });

        if (result.error) {
            console.log(result.error);
        }
    }


    return (
        <>
            <Navbar/>
            <div classNameName='spacing-div'></div>
            <div className='token-main'>
                        
            <div class="card"> 2 tokens</div>    
            <div class="card"> 5 tokens</div>    
            <div class="card"> 10 tokens</div>    
            <div class="card"> 20 tokens</div>    
            </div>

            
        </>
    )
}

export default CartDetails