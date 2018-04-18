import React from 'react';

// @todo check against session for user, render twitchconfig from env at build
const userState = {
  user: null,
  twitchConfig: {
    clientId: 'yjwh4n0hczdps6w82ijlh9s1o03crs',
    redirectUri: 'http://127.0.0.1:8080/auth',
    // pseudorandom csrf key? no, should be generated on the server on a per-request basis.
    // what needs to come from the server on load? user login state from session. twitch config info. random value for oauth csrf.
    oauthState: Math.random().toString(36).substr(2, 16)
  }
};

const UserContext = React.createContext({ auth: userState });

export { UserContext, userState };
