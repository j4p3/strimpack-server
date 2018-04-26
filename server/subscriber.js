import fetch from 'node-fetch';
import StripeClient from 'stripe'

import { Subscription, SubscriptionTier } from './db';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = StripeClient(STRIPE_SECRET_KEY);

// @todo extract to subscription model for pre-creation or something
async function processSubscription(data, user) {
  const tier = await SubscriptionTier.find({where: {level: data.tier.level}});
  
  return stripe.customers.create({
    email: user.email, source: data.token.id
  }).then((customer) => {
    return stripe.subscriptions.create({
      customer: customer.id,
      items: [{ plan: tier.stripe_id }],
    });
  }).then((subscription) => {
    return Subscription.create({
      // what is in here?
      user_id: user.id,
      tier: tier.id,
      stripe_id: subscription.id,
    });
  }).then((subscriptionRecord) => {
    return subscriptionRecord
  }).catch((e) => {
    return e;
  });
}

export default (req, res, next) => {
  if (!req.isAuthenticated()) return res.json({error: 'Auth'});
  const data = req.body;
  const user = req.user.dataValues;
  processSubscription(data, user).then((subscription) => {
    res.json(subscription.dataValues);
  }).catch((e) => res.json(e));
}
