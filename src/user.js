import React from 'react';

const userState = {
  user: null
};

const UserContext = React.createContext({ auth: userState });

export { UserContext, userState };
