import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {

  }

  render() {
    return (
      <h1>Hello from react</h1>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));