import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { Stream } from './db';

import defaults from '../config.default.json';
import config from '../config.json';
import App from '../../strimpack-web-client/src/App';

const path = require('path');
const fs = require('fs');

export default (req, res, next) => {
  // @todo adjust filepath for deployed environments
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

    const stream = {...defaults, ...config};
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
    const html = ReactDOMServer.renderToString(<App user={user} config={stream} />);

    return res.send(template.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div><script>window.__DATA__='${JSON.stringify(data)}';</script>`
    ));
  });
}
