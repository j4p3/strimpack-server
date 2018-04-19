import React from 'react';

// @todo check against session for user, render twitchconfig from env at build
const userState = {
  user: null
};

const UserContext = React.createContext({ auth: userState });

export { UserContext, userState };
