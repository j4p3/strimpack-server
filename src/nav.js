import React, { Component } from 'react';
import './nav.css';

class Nav extends Component {
  render() {
    return (
      <nav>
        <ul className="left">
          <a className="logo-wrap" href="#"><li className="logo"></li></a>
          <a className="title" href="#"><li><span className="accent">Title</span></li></a>
        </ul>
        <ul className="right">
          <a href="https://www.strawpoll.me/15152682"><li><b>What's Next?</b></li></a>
          <a href="#" className="trigger" data-modal="modal-sub"><li>Subscribe</li></a>
          <a href="https://twitch.streamlabs.com/neuro"><li>Donate</li></a>
          <a href="https://www.patreon.com/NeuroZerg"><li>Become a Patron</li> </a>
          <a href="https://drive.google.com/file/d/165wFnuAV2bDpgwJr5RVy3EHRybkt7s1q/view?usp=sharing"><li>Replays</li> </a>
        </ul>
      </nav>
    );
  }
}

export default Nav;
