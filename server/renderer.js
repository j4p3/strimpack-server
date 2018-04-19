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

    // @todo render app preloaded for user
    // console.log(req.session.passport.user);
    const html = ReactDOMServer.renderToString(<App />);

    return res.send(template.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>`
    ));
  });
}
