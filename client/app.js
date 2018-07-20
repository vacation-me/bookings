import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/Calendar.jsx';
import Book from './components/Book.jsx';
import './styles/style.css';
import $ from 'jquery';

class App extends React.Component {
  constructor() {
    super();
    const today = new Date();
    this.state = {
      year: today.getFullYear(),
      month: today.getMonth(),
      date: today.getDate(),
      checkIn: 0,
      booked: []
    };
  }

  componentDidMount() {
    $.get('/cal', (resp) => {
      let result = JSON.parse(resp);
      console.log(result);
    });
  }

  //receives 1 or -1 as an argument to inicate previous or next month
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
        <Book />
        {this.state.checkIn === 0 ? null : 
          <Calendar 
            year={this.state.year} 
            month={this.state.month}
            date={this.state.date}
            click={this.handleCal.bind(this)} 
          />
        }
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));