import Stripe from 'stripe';
import { env } from '@/env/server.mjs';
import type { NextApiHandler } from 'next';
import { prisma } from '@/server/db/client';

const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

const calculateOrderAmount = async (lawyerId: string) => {
  const lawyer = await prisma.lawyer.findUnique({
    where: {
      id: lawyerId,
    },
  });

  if (!lawyer) {
    throw "Lawyer doesn't exits";
  }

  return 131;
};

const handler: NextApiHandler = async (req, res) => {
  const price = await calculateOrderAmount(req.body.lawyerId);

  const order = await prisma.order.create({
    data: {
      price,
      clientId: req.body.clientId,
      lawyerId: req.body.lawyerId,
      orderStatus: 'PENDING',
      transactionId: '',
    },
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
    currency: 'inr',
    metadata: {
      orderId: order.id,
    },
    payment_method_types: ['card'],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

export default handler;
