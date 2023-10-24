"use client"

import React, { useEffect, useState } from 'react'

import { loadStripe } from '@stripe/stripe-js';


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
            <div className='row justify-content-center m-0'>
                <div className='col-md-8 mt-5 mb-5 cardsdetails'>
                    <div className="card">
                        
                        <div className="card-body p-0">
                            {
                                    
                                    <table className='table cart-table mb-0 table-responsive-sm'>
                                        
                                       
                                        <tfoot>
                                            <tr>
                                               <th className='text-right'><button className='btn btn-success' onClick={makePayment} type='button'>Checkout</button></th>
                                            </tr>
                                        </tfoot>
                                    </table>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartDetails