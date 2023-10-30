import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import stripe from 'stripe';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc, increment } from 'firebase/firestore';

import {db} from '../app/HOCS/firebase.mjs';
dotenv.config();

const app = express();
const stripeClient = stripe('sk_test_51O59SISG7DinUUfb1L55H1F4EBePEtlormgL8HGaSS55NNkZ31DKcJo0hKTCirkccUv0KVhw2wHAWG5h9BhP6UKN00GmDJpunP');

app.use(express.json());
app.use(cors());



app.post('/main/suces', async (req, res) => {
    console.log("inside")
    const { session_id, userId } = req.body;
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
  
      if (session.payment_status === "paid") {
        
        console.log("pay")
        // Updating Firebase data using Firestore
        const userRef = doc(db, 'items', userId); 
        await updateDoc(userRef, {
            credits: increment(10) });
  
        res.status(200).send("Firebase data updated successfully.");
      } else {
        res.status(400).send("Payment not successful.");
      }
    } catch (error) {
        console.log("error")
      res.status(500).send("Error updating Firebase data: " + error.message);
    }
  });


// Checkout API
app.post('/api/create-checkout-session', async (req, res) => {
    const { userId,products } = req.body;

    const lineItems = products.map((product) => ({
        price_data: {
            currency: 'inr',
            product_data: {
                name: product.dish,
                images: [product.imgdata],
            },
            unit_amount: product.price * 100,
        },
        quantity: product.qnty,
    }));

    try {
        const session = await stripeClient.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:3000/main/sucess',
            cancel_url: 'http://localhost:3000/main/cancel',
        });

        res.json({ id: session.id, userId });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'An error occurred while creating the checkout session.' });
    }
});

app.listen(7000, () => {
    console.log('Server started');
});
