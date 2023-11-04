import { loadStripe } from '@stripe/stripe-js';

const stripe = await loadStripe("pk_test_51O59SISG7DinUUfbH5x5c5lYaqWXHTdzwPTKnqoEfVKEDT6smQIEq6ONIy3VtruNm9E8n2zCgKMbSpuk5nVx6CcE00OVgbaOY7");

import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page
