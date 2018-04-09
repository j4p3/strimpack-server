
let host = '127.0.0.1';
let port = '8082';

class Store {
  constructor(props) {
    if ('callback' in props) {
      this.callback = props.callback;
      this.context = props.context;
    } else {
      return Error('Error: no callback in props')
    }
    this.socket = new WebSocket(`ws://${host}:${port}`)
    this.socket.onmessage = (evt) => this.receive(this.process(evt));
  }

  process(evt) {
    try {
      return JSON.parse(evt.data);
    } catch (e) {
      if (e instanceof SyntaxError) {
        return { error: 'Error: invalid message format.' };
      }
      return { error: 'Error: could not handle received data.' };
    }
  }

  receive(data) {
    this.callback.call(this.context, data);
  }

  broadcast(data) {
    this.socket.send(JSON.stringify(data));
  }
}

export default Store;
