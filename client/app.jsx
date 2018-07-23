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
    this.today = new Date();
    this.state = {
      year: this.today.getFullYear(),
      month: this.today.getMonth(),
      requestedDates: [],
      stage: 0,
      price: 0,
      cleaning: 0,
      maxGuests: 0,
      minStay: 0,
      serviceFee: 0,
      bookedDates: []
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
        bookedDates: result.year
      });
    });
  }

  handleCheckInClick(newStage) {
    this.setState({stage: this.state.stage === newStage ? 0 : newStage});
  }

  // handles moving the calendar to the next or previous month
  handleCalendar(i) {
    let newMonth = this.state.month + i;
    let newYear = this.state.year;
    if (newMonth === 12) {
      newMonth = 0;
      newYear++; 
    } else if (newMonth === -1) {
      newMonth = 11;
      newYear--;
    }
    this.setState({
      year: newYear,
      month: newMonth
    });
  }

  handleMouseOver(target) {
    // console.log(target)
  }

  handleClearDates() {
    this.setState({
      stage: 'in',
      requestedDates: [],
    });
  }

  //handle date selection
  handleDateSelect(e) {
    let requestedDates = this.state.requestedDates;
    let target = +e.target.innerHTML;
    let stage = this.state.stage;
    if (stage === 'in') {
      stage = 'out';
    } else if (stage === 'out') {
      stage = 'ready';
    }
    if (requestedDates.length < 2) {
      requestedDates.push(new Date(this.state.year, this.state.month, target));
    }
    this.setState({
      requestedDates,
      stage,
    });
  }

  render() {
    return (
      <div id="container">
        <div id="bookings">
          <h3><span id="price">{`$${this.state.price}`}</span> per night</h3>
          <hr />
          <div className="sub-component">
            <h3 className={this.state.stage === 'in' ? 'current-stage' : ''} onClick={() => this.handleCheckInClick('in')}>Check-in</h3>
            <img className="icon" src={rightArrow} />
            <h3 className={this.state.stage === 'out' ? 'current-stage' : ''} onClick={() => this.handleCheckInClick('out')}>Check-out</h3>
          </div>
          {this.state.stage === 0 || this.state.stage === 'ready' ? null : 
            <Calendar 
              stage={this.state.stage}
              currentDate={this.today}
              month={this.state.month}
              year={this.state.year}
              range={this.state.requestedDates}
              bookedDates={this.state.bookedDates}
              handleCalendar={this.handleCalendar.bind(this)}
              handleSelect={this.handleDateSelect.bind(this)}
              handleMouseOver={this.handleMouseOver.bind(this)}
              clearDates={this.handleClearDates.bind(this)}
            />
          }
          <div className="sub-component">
            <h3>Guests</h3>
            <img className="icon" src={downArrow} />
          </div>
          {this.state.stage === 'ready' ? 
            <div id="booking-info">
              <p className="info-left">{`$${this.state.price} x ${this.state.requestedDates[1].getDate() - this.state.requestedDates[0].getDate()} nights`}</p>
              <hr />
              <p className="info-left">Service Fee<img className="small-icon" src={question}/></p>
            </div>
            : null
          }
          <div className="sub-component" id="book-btn">
            <h2>Request to Book</h2>
          </div>
          <p>You wont be charged</p>
        </div> 
        <div className="sub-component" id="report">
          <img src={flag} className="icon"/>
          <p>Report this Listing</p>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));