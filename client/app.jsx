import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/Calendar.jsx';
import CalendarTitle from './components/CalendarTitle.jsx';
import Pricing from './components/Pricing.jsx';
import Guests from './components/Guests.jsx';
import downArrow from './styles/icons/down_arrow.svg';
import upArrow from './styles/icons/up_arrow.svg';
import flag from './styles/icons/flag.svg';
import './styles/style.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      availableDates: [],
      requestedDates: [],
      guestCount: {
        adults: 1, 
        children: 0,
        infants: 0
      },
      checkOutStage: 0,
      price: 0,
      cleaningFee: 0,
      maxGuests: 0,
      minStay: 0,
      serviceFee: 0,
      isSelectingGuests: false,
    };
    this.getCalendarTitle = this.getCalendarTitle.bind(this);
  }

  componentDidMount() {
    fetch('/listing_info')
      .then(res => res.json())
      .then(body => {
        this.setState({
          price: body.price,
          cleaningFee: body.cleaning,
          maxGuests: body.maxGuests,
          minStay: body.minStay,
          serviceFee: body.serviceFee,
          availableDates: body.year
        });
      })
      .catch(err => { throw err; });
  }


  setNextStage(newStage) {
    if (this.state.checkOutStage === newStage) {
      newStage = 0;
    }
    this.setState({
      checkOutStage: newStage,
      isSelectingGuests: false,
    });
  }

  toggleGuestSelectView() {
    const newStatus = !this.state.isSelectingGuests;
    this.setState({isSelectingGuests: newStatus});
  }

  updateGuestCount(type, num) {
    let guestCount = this.state.guestCount;
    guestCount[type] += num;
    this.setState({
      guestCount,
    });
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
    return (<h3 className={classNames} id={`${titles[checkOutStage].toLowerCase()}`}onClick={() => this.setNextStage(checkOutStage + 1)}>{text}</h3>);
  }

  //handle date selection
  setSelectedDate(selectedDate) {
    let requestedDates = this.state.requestedDates;
    let checkOutStage = this.state.checkOutStage + 1;
    if (requestedDates.length < 2) {
      requestedDates.push(new Date(this.state.year, this.state.month, selectedDate));
    }
    this.setState({
      requestedDates,
      checkOutStage,
    });
  }

  renderGuestTitle() {
    const guestCount = this.state.guestCount;
    const totalGuestCount = guestCount.adults + guestCount.children;
    let output = `${totalGuestCount} guest`;
    let icon = downArrow;
    if (totalGuestCount > 1) {
      output += 's';
    }
    if (guestCount.infants > 0) {
      output += `, ${guestCount.infants} infant`;
      if (guestCount.infants > 1) {
        output += 's';
      }
    }
    if (this.state.isSelectingGuests) {
      icon = upArrow;
    }
    return (
      <div className="sub-component" onClick={this.toggleGuestSelectView.bind(this)}>
        <h3>{output}</h3> 
        <img className="icon" src={icon} />
      </div>
    );
  }

  render() {
    return (
      <div id="container">
        <div id="bookings">
          <h3><span id="price">{`$${this.state.price}`}</span> per night</h3>
          <hr />
          <CalendarTitle renderTitle={this.getCalendarTitle.bind(this)} />
          {this.state.checkOutStage === 0 || this.state.checkOutStage === 3 || 
            <Calendar 
              checkOutStage={this.state.checkOutStage}
              month={this.state.month}
              year={this.state.year}
              requestedDates={this.state.requestedDates}
              availableDates={this.state.availableDates}
              minStay={this.state.minStay}
              changeMonth={this.changeMonth.bind(this)}
              selectDate={this.setSelectedDate.bind(this)}
              clearDates={this.clearDates.bind(this)}
            />
          }
          {this.renderGuestTitle.call(this)}
          {this.state.isSelectingGuests && 
            <Guests 
              maxGuests={this.state.maxGuests} 
              updateGuestCount={this.updateGuestCount.bind(this)}
              guestCount={this.state.guestCount}
              toggleView={this.toggleGuestSelectView.bind(this)}
            />}
          {this.state.checkOutStage === 3 && 
            <Pricing 
              price={this.state.price} 
              requestedDates={this.state.requestedDates} 
              cleaningFee={this.state.cleaningFee}
              serviceFee={this.state.serviceFee}
            />
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
