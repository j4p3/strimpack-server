import Sequelize from 'sequelize';

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

const db = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);

const User = db.define('user', {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  subscription_level: Sequelize.INTEGER,
}, {
  timestamps: true,
  underscored: true
});

const StripeSubscription = db.define('subscription', {
  // @todo store subscription details. maybe have a separate subscription app.
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  timestamps: true,
  underscored: true
})

const TwitchAuthentication = db.define('authentication', {
  // @todo: store access/refresh token? what does twitch send back?
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  timestamps: true,
  underscored: true
});


export { db, User, StripeSubscription, TwitchAuthentication };
