import { env } from '@/env/client.mjs';
import { Button } from '@mantine/core';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000',
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message!);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setLoading(false);
  };

  return (
    <form id='payment-form' onSubmit={handleSubmit} style={{ width: '100%' }}>
      <PaymentElement id='payment-element' />
      <Button
        disabled={isLoading || !stripe || !elements}
        type='submit'
        loading={isLoading}
        mt={3}
        mb={3}
      >
        Pay
      </Button>
      {message && <div id='payment-message'>{message}</div>}
    </form>
  );
};

function Order({ clientSecret }: { clientSecret: string }) {
  return (
    <Elements
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
        },
      }}
      stripe={stripePromise}
    >
      <Payment />
    </Elements>
  );
}

export default function NewOrder() {
  const [clientSecret, setClientSecret] = useState('');
  const { data } = useSession();
  const { query } = useRouter();
  const [isPaymentIntentCreated, setIntentCreated] = useState(false);

  useEffect(() => {
    if (true && !isPaymentIntentCreated) {
      axios
        .post('/api/create-payment-intent', {
          lawyerId: 'clblnaiz60000wwdyapm7hpfw',
          clientId: data?.user?.id,
        })
        .then((res) => {
          console.log(res.data);
          setClientSecret(res.data.clientSecret);
          setIntentCreated(true);
        });
    }
  }, []);

  if (clientSecret) {
    return <Order clientSecret={clientSecret} />;
  }

  return <div>loading</div>;
}
