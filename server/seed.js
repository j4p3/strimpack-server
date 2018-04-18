import { User, StripeSubscription, TwitchAuthentication } from './db';

let u = User.create({
  username: 'jp',
  email: 'jp@unqualified.io',
  subscription_level: 0
});