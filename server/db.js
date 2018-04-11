import Sequelize from 'sequelize';

const config = {
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  port: DB_PORT,
}

const db = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);

const User = db.define('user', {
  username: Sequelize.STRING,
}, {
  timestamps: true,
});
// twitch_id
// subscription
// hmm

const sync = () => {
  User.sync().then(() => {
    console.log('Table synced: Users')
  });
}