import { db } from './db';

db.sync({ force: true }).then(() => {
  console.log('\x1b[32m%s\x1b[0m', 'DB synced')
}).catch((e) => {
  console.log('\x1b[31m%s\x1b[0m', 'DB sync failed')
});
