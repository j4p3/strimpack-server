import React from 'react';
import ReactDOMServer from 'react-dom/server';

import defaults from '../config.default.json';
import config from '../config.json';
import App from '../../strimpack-web-client/src/App';

const path = require('path');
const fs = require('fs');

const STRIPE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;
const HOST = process.env.VIRTUAL_HOST;
const THEME_COLOR = process.env.THEME_COLOR;
const CHANNEL = process.env.STREAM_CHANNEL;
const TITLE = process.env.STREAM_TITLE;

export default (req, res, next) => {
  const filePath = path.resolve(__dirname, '..', '..', 'strimpack-web-client', 'build', 'index.html');
  fs.readFile(filePath, 'utf8', (e, template) => {
    if (e) {
      console.error('Loading HTML failed internally.', e);
      return res.status(500).end();
    }

    let data = {
      stream: null,
      user: null,
    };

    // @todo pull subscription tiers out of somewhere. db?
    const stream = Object.assign(defaults, config, {
      stripeKey: STRIPE_KEY,
      host: HOST,
      themeColor: THEME_COLOR,
      channel: CHANNEL,
      title: TITLE,
    });
    data.stream = stream;

    if (req.isAuthenticated()) {
      const user = req.user;
      data.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        twitch_profile_image: user.twitch_profile_image,
      };
    }

    // @todo routing
    const html = ReactDOMServer.renderToString(
      <App user={data.user} stream={data.stream} />);

    return res.send(template.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div><script>window.__DATA__='${JSON.stringify(data)}';</script>`
    ));
  });
}
