import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/Calendar.jsx';
import rightArrow from './styles/icons/right_arrow.svg';
import downArrow from './styles/icons/down_arrow.svg';
import flag from './styles/icons/flag.svg';
import question from './styles/icons/question.svg';
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

  handleCheckIn() {
    let currentStage = this.state.checkIn === 0 ? 1 : this.state.checkIn === 1 ? 2 : 0;
    this.setState({
      checkIn: currentStage
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
      <div id="container">
        <div id="bookings">
          <h3>{`$${this.state.price} per night`}</h3>
          <hr />
          <div className="select">
            <h3 onClick={this.handleCheckIn.bind(this)}>Check-in</h3>
            <img className="icon" src={rightArrow} />
            <h3 onClick={this.handleCheckIn.bind(this)}>Check-out</h3>
          </div>
          {this.state.checkIn === 0 ? null : 
            <Calendar 
              checkIn={this.state.checkIn}
              click={this.handleCal.bind(this)}
              date={this.state.date}
              month={this.state.month}
              year={this.state.year}
            />
          }
          <div className="select">
            <h3>Guests</h3>
            <img className="icon" src={downArrow} />
          </div>
          {this.state.checkIn === 2 ? 
            <div id="booking-info">
              <p className="info-left">{`$${this.state.price} x ${this.state.nights || 1} nights`}</p>
              <hr />
              <p className="info-left">Service Fee<img className="small-icon" src={question}/></p>
            </div>
            : null
          }
          <div className="select" id="book-btn">
            <h2>Request to Book</h2>
          </div>
          <p>You wont be charged</p>
        </div> 
        <div className="select" id="report">
          <img src={flag} className="icon"/>
          <p>Report this Listing</p>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));