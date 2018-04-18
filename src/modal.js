import React from 'react';
import './modal.css';

const content = {
  hi: {
    title: 'Foo',
    main: (<p>Hi</p>),
    footer: 'Baz'
  },
  subscribe: {
    title: 'Foo',
    main: (<p>Subscribe</p>),
    footer: 'Baz'
  },
  signup: {
    title: 'Foo',
    main: (<p>Signup</p>),
    footer: 'Baz'
  },
  login: {
    title: 'Foo',
    main: (<p>Login</p>),
    footer: 'Baz'
  }
};

const ModalContext = React.createContext({ mode: content.hi });

const ModalContent = (props) => {
  return (
    <div className='modal container'>
      <div className="background"
            onClick={props.close}></div>
      <div className="content">
        <header>
          <p>{props.content.title}</p>
          <button className="close"
            onClick={props.close}>
            Close
          </button>
        </header>
        <section>
          {props.content.main}
        </section>
        <footer>
          <p>{props.content.footer}</p>
        </footer>
      </div>
    </div>
  )
}

const Modal = (props) => {
  return (
    <ModalContext.Consumer>
      {(context) => {
        if (context.visible) return (
          <ModalContent
            {...props}
            {...context} />
        )
      }}
    </ModalContext.Consumer>
  )
}

export { Modal, ModalContext, content };
