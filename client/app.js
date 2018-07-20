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
      price: 0,
      cleaning: 0,
      maxGuests: 0,
      minStay: 0,
      serviceFee: 0,
      booked: []
    };
  }

  componentDidMount() {
    $.get('/cal', (res) => {
      let result = JSON.parse(res);
      this.setState({
        price: result.price,
        cleaning: result.cleaning,
        maxGuests: result.maxGuests,
        minStay: result.minStay,
        serviceFee: result.serviceFee,
        booked: result.year
      });
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
        <Book 
          price={this.state.price} 
          cleaning={this.state.cleaning} 
          maxGuests={this.state.maxGuests} 
          minStay={this.state.minStay} 
          serviceFee={this.state.serviceFee} 
          booked={this.state.booked}         
        />
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