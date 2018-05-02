import Sequelize from 'sequelize';

import defaults from '../config.default.json';
import config from '../config.json';

const DB_USER = process.env.STRIMPACK_DB_USER;
const DB_PASSWORD = process.env.STRIMPACK_DB_PASSWORD;
const DB_NAME = process.env.STRIMPACK_DB_NAME;
const DB_HOST = process.env.STRIMPACK_DB_HOST;
const DB_PORT = process.env.STRIMPACK_DB_PORT;
const connection = `${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const db = new Sequelize('postgres://' + connection);

const User = db.define('user', {
  username: { type: Sequelize.STRING, unique: true },
  email: { type: Sequelize.STRING, unique: true },
  subscription_level: Sequelize.INTEGER,
  twitch_id: { type: Sequelize.STRING, unique: true },
  twitch_username: { type: Sequelize.STRING, unique: true },
  twitch_profile_image: Sequelize.STRING,
  twitch_access_token: Sequelize.STRING,
  twitch_refresh_token: Sequelize.STRING,
}, {
  timestamps: true,
  underscored: true,
});

const SubscriptionTier = db.define('subscription_tier', {
  level: Sequelize.INTEGER,
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  cost: Sequelize.INTEGER,
  stripe_id: Sequelize.STRING,
}, {
  timestamps: true,
  underscored: true,
});

// @todo add creation hook to create subscription on stripe & create or error here
const Subscription = db.define('subscription', {
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  tier: {
    type: Sequelize.INTEGER,
    references: {
      model: SubscriptionTier,
      key: 'id'
    }
  },
  stripe_id: Sequelize.STRING,
}, {
  timestamps: true,
  underscored: true,
});

const Session = db.define('session', {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true,
    deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
  },
  sess: Sequelize.JSON,
  expire: Sequelize.DATE(6)
}, {
  timestamps: false,
  underscored: true,
  freezeTableName: true,
});

const seedSubscriptionTiers = () => {
  const stream = Object.assign(defaults, config);
  return SubscriptionTier.bulkCreate(stream.subscriptionTiers).then(() => {
    return Subscription.findAll();
  }).then(subs => {
    console.log(subs);
    return;
  }).catch((e) => {
    console.log('\x1b[31m%s\x1b[0m', 'DB seed failed');
    return;
  });
}

export { db, connection, User, Subscription, SubscriptionTier, seedSubscriptionTiers };
