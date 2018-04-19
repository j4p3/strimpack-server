import Sequelize from 'sequelize';

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
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

export { db, connection, User, StripeSubscription };
