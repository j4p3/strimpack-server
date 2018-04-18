import { User, StripeSubscription, TwitchAuthentication } from './db';

// @todo: investigate sequelize async/await compatibility
User.sync().then(() => {
  console.log('\x1b[32m%s\x1b[0m', 'Table synced: Users')
}).catch(e => console.log(e));
StripeSubscription.sync().then(() => {
  console.log('\x1b[32m%s\x1b[0m', 'Table synced: StripeSubscription')
}).catch(e => console.log(e));
TwitchAuthentication.sync().then(() => {
  console.log('\x1b[32m%s\x1b[0m', 'Table synced: TwitchAuthentication')
}).catch(e => console.log(e));
