import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/Calendar.jsx';
import './style.css';
import $ from 'jquery';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      year: 2019,
      month: 1,
      booked: []
    };
  }

  componentDidMount() {
    $.get('/cal', (resp) => {
      let result = JSON.parse(resp);
    });
  }

  handleCal(i) {
    let month = this.state.month + i;
    let year = this.state.year;
    if (month === 12) {
      month = 0;
      year++; 
    } else if (month === -1) {
      month = 11;
      year--;
    }

    this.setState({
      year: year,
      month: month
    });
  }

  render() {
    return (
      <div>
        <Calendar 
          year={this.state.year} 
          month={this.state.month}
          click={this.handleCal.bind(this)} 
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));