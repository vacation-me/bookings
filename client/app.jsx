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
    this.state = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      bookedDates: [],
      requestedDates: [],
      checkOutStage: 0,
      price: 0,
      cleaning: 0,
      maxGuests: 0,
      minStay: 0,
      serviceFee: 0,
    };
    this.getCalendarTitle = this.getCalendarTitle.bind(this);
  }

  componentDidMount() {
    $.get('/listing_info', (res) => {
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


  setNextStage(newStage) {
    this.setState({checkOutStage: newStage});
  }

  // handles moving the calendar to the next or previous month
  changeMonth(i) {
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

  clearDates() {
    this.setState({
      checkOutStage: 1,
      requestedDates: [],
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
    });
  }

  getCalendarTitle(checkOutStage) {
    const titles = ['Check-in', 'Check-out'];
    let classNames = '';
    let text = '';
    if (this.state.requestedDates.length < checkOutStage + 1) {
      text = titles[checkOutStage];
    } else if (this.state.requestedDates.length >= checkOutStage + 1) {
      text = `${this.state.requestedDates[checkOutStage].getMonth()}/${this.state.requestedDates[checkOutStage].getDate()}/${this.state.requestedDates[checkOutStage].getFullYear()}`;
    }
    if (this.state.checkOutStage === checkOutStage + 1) {
      classNames = 'current-stage';
    }
    return (<h3 className={classNames} onClick={() => this.setNextStage(checkOutStage + 1)}>{text}</h3>);
  }

  //handle date selection
  setSelectedDate(selectedDate) {
    let requestedDates = this.state.requestedDates;
    let checkOutStage = this.state.checkOutStage;
    if (checkOutStage === 1) {
      checkOutStage = 2;
    } else if (checkOutStage === 2) {
      checkOutStage = 3;
    }
    if (requestedDates.length < 2) {
      requestedDates.push(new Date(this.state.year, this.state.month, selectedDate));
    }
    this.setState({
      requestedDates,
      checkOutStage,
    });
  }

  render() {
    return (
      <div id="container">
        <div id="bookings">
          <h3><span id="price">{`$${this.state.price}`}</span> per night</h3>
          <hr />
          <div className="sub-component">
            {this.getCalendarTitle(0)}
            <img className="icon" src={rightArrow} />
            {this.getCalendarTitle(1)}
          </div>
          {this.state.checkOutStage === 0 || this.state.checkOutStage === 3 ? null : 
            <Calendar 
              checkOutStage={this.state.checkOutStage}
              month={this.state.month}
              year={this.state.year}
              requestedDates={this.state.requestedDates}
              bookedDates={this.state.bookedDates}
              changeMonth={this.changeMonth.bind(this)}
              selectDate={this.setSelectedDate.bind(this)}
              clearDates={this.clearDates.bind(this)}
            />
          }
          <div className="sub-component">
            <h3>Guests</h3>
            <img className="icon" src={downArrow} />
          </div>
          {this.state.checkOutStage === 'ready' ? 
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
          <p>You won't be charged</p>
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