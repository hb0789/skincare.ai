import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51O59SISG7DinUUfbH5x5c5lYaqWXHTdzwPTKnqoEfVKEDT6smQIEq6ONIy3VtruNm9E8n2zCgKMbSpuk5nVx6CcE00OVgbaOY7');

export default function App() {
  const options = {
    clientSecret: 'sk_test_51O59SISG7DinUUfb1L55H1F4EBePEtlormgL8HGaSS55NNkZ31DKcJo0hKTCirkccUv0KVhw2wHAWG5h9BhP6UKN00GmDJpunP',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};