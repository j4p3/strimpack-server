const { Client } = require('pg');
import { db, User, Subscription, SubscriptionTier, seedSubscriptionTiers } from './db';

const ROOT_USER = process.env.POSTGRESQL_ROOT_USER;
const ROOT_PASSWORD = process.env.POSTGRESQL_ROOT_PASSWORD;
const DB_USER = process.env.STRIMPACK_DB_USER;
const DB_PASSWORD = process.env.STRIMPACK_DB_PASSWORD;
const DB_NAME = process.env.STRIMPACK_DB_NAME;
const DB_HOST = process.env.STRIMPACK_DB_HOST;
const DB_PORT = process.env.STRIMPACK_DB_PORT;

const establish = async () => {
  try {
    const auth = await db.authenticate();
    return auth;
  } catch (e) {
    return e;
  }
}

const sync = async () => {
  try {
    const sync = await db.sync({ force: true });
    return sync;
  } catch (e) {
    return e;
  }
}

const seed = async () => {
  const seed = await seedSubscriptionTiers();
  return seed;
}

const prepareDb = () => {
  console.log('\x1b[32m%s\x1b[0m', 'DB preparation underway');
  establish().then(() => {
    console.log('\x1b[32m%s\x1b[0m', 'DB syncing');
    return sync();
  }).then(() => {
    console.log('\x1b[32m%s\x1b[0m', 'DB seeding');
    return seed();
  }).catch((e) => {
    console.log('\x1b[31m%s\x1b[0m', 'DB preparation failed');
    return e;
  });
}

const createOrFail = (pg) => {
  console.log('\x1b[32m%s\x1b[0m', 'DB testing for existing database');
  return pg.query(`CREATE DATABASE ${DB_NAME};`).then((dRes) => {
    console.log('\x1b[32m%s\x1b[0m', 'DB creating user & permissions');
    return pg.query(`CREATE USER ${DB_USER} WITH PASSWORD '${DB_PASSWORD}'; GRANT ALL ON DATABASE ${DB_NAME} TO ${DB_USER};`).then((uRes) => {
      pg.end();
      return true;
    });
  }).catch((e) => {
    if (e.code === '42P04') {
      console.log('\x1b[32m%s\x1b[0m', 'DB found');
      pg.end();
      return false;
    } else {
      pg.end();
      return e;
    }
  });
}

const connect = async () => {
  console.log('\x1b[32m%s\x1b[0m', 'DB creating connection');
  try {
    const pg = new Client({
      user: ROOT_USER,
      password: ROOT_PASSWORD,
      host: DB_HOST,
      database: 'postgres',
      port: DB_PORT,
    });
    await pg.connect();
    return pg;
  } catch (e) {
    return e;
  }
}

connect().then((pg) => {
  console.log('\x1b[32m%s\x1b[0m', 'DB connection established');

  createOrFail(pg).then((creation) => {
    if (creation) {
      console.log('\x1b[32m%s\x1b[0m', 'DB creation completed.');
      return prepareDb();
    } else {
      console.log('\x1b[32m%s\x1b[0m', 'DB preparation already completed.');
    }
  }).catch((e) => {
    console.log('\x1b[31m%s\x1b[0m', 'DB setup failed');
  });
}).catch((e) => {
  console.log(e);
  console.log('\x1b[31m%s\x1b[0m', 'DB connection failed');
})

