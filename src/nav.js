import React, { Component } from 'react';

import { ModalContext } from './modal';
import { UserContext } from './user';
import './nav.css';

const Login = (props) => {
  return (
    <a href='/auth'><li>Login</li></a>
  )
}

const UserMenu = (props) => {
  return (
    <a href="/"><li>{props.username}</li></a>
  )
}

class Nav extends Component {
  render() {
    return (
      <nav>
        <ul className="left">
          <a className="logo-wrap" href="#"><li className="logo"></li></a>
          <a className="title" href="#"><li><span className="accent">Title</span></li></a>
        </ul>
        <ModalContext.Consumer>
          {(modalContext) => (
              <ul className="right">
                <a href="https://www.strawpoll.me/15152682"><li><b>What's Next?</b></li></a>
                <a href="#"
                   onClick={modalContext.subscribe}><li>
                Subscribe</li></a>
                <a href="https://twitch.streamlabs.com/neuro"><li>
                  Donate</li></a>
                <a href="https://www.patreon.com/NeuroZerg"><li>
                  Become a Patron</li> </a>
                <a href="https://drive.google.com/file/d/165wFnuAV2bDpgwJr5RVy3EHRybkt7s1q/view?usp=sharing"><li>
                  Replays</li> </a>
                <UserContext.Consumer>
                  {(userContext) => {
                    if (userContext.user) {
                      return (<UserMenu {...userContext.user} />);
                    } else {
                      return (<Login />);
                    }
                  }}
                </UserContext.Consumer>
              </ul>
          )}
        </ModalContext.Consumer>
      </nav>
    );
  }
}

export default Nav;
