import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '../src/App';

const path = require('path');
const fs = require('fs');

export default (req, res, next) => {
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html');
  fs.readFile(filePath, 'utf8', (e, template) => {
    if (e) {
      console.error('Loading HTML failed internally.', e);
      return res.status(500).end();
    }

    let user = {};
    if (req.isAuthenticated()) {
      user = {
        id: req.user.id,
        username:  req.user.username,
        email:  req.user.email,
        twitch_profile_image:  req.user.twitch_profile_image,
      };
    }

    // @todo routing
    const html = ReactDOMServer.renderToString(<App user={user} />);

    return res.send(template.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div><script>window.__DATA__='${JSON.stringify(user)}';</script>`
    ));
  });
}
