import express from 'express';

import renderer from './renderer';

const port = 8080;
const path = require('path');

const app = express();
const router = express.Router();

router.use('*', renderer);

app.use(router);

app.listen(port, (e) => {
  if (e) {
    return console.error('webapp: server failure', e);
  }

  console.log('webapp: ssr server running on port ' + port);
})
