import React from 'react';
import Calendar from './Calendar/Calendar';
import CalendarTitle from './Calendar/CalendarTitle';
import Pricing from './Pricing/Pricing';
import Guests from './Guests/Guests';
import downArrow from '../styles/icons/down_arrow.svg';
import upArrow from '../styles/icons/up_arrow.svg';
import '../styles/style.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      availableDates: [],
      requestedDates: [],
      id: 0,
      guestCount: {
        adults: 1,
        children: 0,
        infants: 0,
      },
      checkOutStage: 0,
      price: 0,
      cleaningFee: 0,
      maxGuests: 0,
      minStay: 0,
      serviceFee: 0,
      isSelectingGuests: false,
      showPopUpInfo: 0,
    };
    this.getCalendarTitle = this.getCalendarTitle.bind(this);
    this.updateGuestCount = this.updateGuestCount.bind(this);
    this.submitRequest = this.submitRequest.bind(this);
  }

  componentDidMount() {
    if (this.props.id) {
      this.setState({ ...this.props });
    } else {
      fetch('/api/listing_info')
        .then(res => res.json())
        .then((body) => {
          this.setState({ ...body });
        })
        .catch((err) => { throw err; });
    }
  }


  setNextStage(newStage) {
    const { checkOutStage } = this.state;
    this.setState({
      checkOutStage: checkOutStage === newStage ? 0 : newStage,
      isSelectingGuests: false,
      showPopUpInfo: 0,
    });
  }

  // handle date selection
  setSelectedDate(selectedDate) {
    const {
      requestedDates,
      checkOutStage,
      month,
      year,
    } = this.state;

    if (requestedDates.length < 2) {
      requestedDates.push(new Date(year, month, selectedDate));
    }
    this.setState({
      requestedDates,
      checkOutStage: checkOutStage + 1,
    });
  }

  getCalendarTitle(titleStage) {
    const { requestedDates, checkOutStage } = this.state;
    const titles = ['Check-in', 'Check-out'];
    let classNames = '';
    let text = '';
    // check if title respective date has been selected
    if (requestedDates.length < titleStage + 1) {
      text = titles[titleStage];
    } else if (requestedDates.length >= titleStage + 1) {
      text = `${requestedDates[titleStage].getMonth() + 1}/${requestedDates[titleStage].getDate()}/${requestedDates[titleStage].getFullYear()}`;
    }
    if (checkOutStage === titleStage + 1) {
      classNames = 'current-stage';
    }
    return (
      <h3 
        className={classNames} 
        id={`${titles[titleStage].toLowerCase()}`} 
        onClick={() => this.setNextStage(titleStage + 1)}>
        {text}
      </h3>);
  }

  clearDates() {
    this.setState({
      checkOutStage: 1,
      requestedDates: [],
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
    });
  }

  // handles moving the calendar to the next or previous month
  changeMonth(i) {
    const { month, year } = this.state;
    let newMonth = month + i;
    let newYear = year;
    if (newMonth === 12) {
      newMonth = 0;
      newYear += 1;
    } else if (newMonth === -1) {
      newMonth = 11;
      newYear -= 1;
    }
    this.setState({
      year: newYear,
      month: newMonth,
    });
  }

  updateGuestCount(type, num) {
    const { guestCount } = this.state;
    guestCount[type] += num;
    this.setState({
      guestCount,
    });
  }

  toggleGuestSelectView() {
    const { isSelectingGuests } = this.state;
    const newStatus = !isSelectingGuests;
    this.setState({
      isSelectingGuests: newStatus,
      showPopUpInfo: 0,
    });
  }

  toggleInfoPopUp(popUpId) {
    const { showPopUpInfo } = this.state;
    if (showPopUpInfo === popUpId) {
      this.setState({
        showPopUpInfo: 0,
      });
    } else {
      this.setState({
        showPopUpInfo: popUpId,
      });
    }
  }

  submitRequest() {
    const { requestedDates, id, checkOutStage } = this.state;
    if (checkOutStage !== 3) {
      this.setState({
        checkOutStage: checkOutStage === 0 ? 1 : 2,
      });
      return;
    }
    const currentMonth = new Date().getMonth();
    const getBookingData = (date) => {
      const month = date.getMonth();
      if (month < currentMonth) {
        return { index: currentMonth + month, date: date.getDate() };
      }
      return { index: month - currentMonth, date: date.getDate() };
    };
    const checkIn = getBookingData(requestedDates[0]);
    const checkOut = getBookingData(requestedDates[1]);

    // get array ineces from requested dates
    const reqBody = {
      id,
      checkIn,
      checkOut,
    };

    fetch('/api/submit', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(reqBody),
    })
      .then(res => res.json())
      .then(data => this.setState({ ...data, checkOutStage: 4, requestedDates: [] }));
  }

  renderGuestTitle() {
    const { guestCount, isSelectingGuests, } = this.state;
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
    if (isSelectingGuests) {
      icon = upArrow;
    }
    return (
      <div className='sub-component' id='toggle-guest-view' onClick={this.toggleGuestSelectView.bind(this)}>
        <h3>{output}</h3> 
        <img className='icon' src={icon} />
      </div>
    );
  }

  render() {
    return (
      <div id='container'>
        {this.state.checkOutStage === 4 && (
          <div id="requested-message-container">
            <h1>
              {'Your request was succesfully submitted!!'}
            </h1>
            <h2>
              The host will contact you shortly
            </h2>
          </div>
        )}
        <div id='bookings'>
          <h3><span id='price'>{`$${this.state.price}`}</span> per night</h3>
          <hr />
          <CalendarTitle renderTitle={this.getCalendarTitle.bind(this)} />
          {(this.state.checkOutStage === 1 || this.state.checkOutStage === 2)
            && (
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
            )
          }
          {this.renderGuestTitle.call(this)}
          {this.state.isSelectingGuests && (
            <Guests
              maxGuests={this.state.maxGuests} 
              updateGuestCount={this.updateGuestCount.bind(this)}
              guestCount={this.state.guestCount}
              toggleView={this.toggleGuestSelectView.bind(this)}
            />
          )}
          {this.state.checkOutStage === 3
          && (
            <Pricing
              price={this.state.price} 
              requestedDates={this.state.requestedDates} 
              cleaningFee={this.state.cleaningFee}
              serviceFee={this.state.serviceFee}
              showPopUpInfo={this.state.showPopUpInfo}
              toggleInfo={this.toggleInfoPopUp.bind(this)}
            />
          )}
          <div className='sub-component' id='book-btn' onClick={() => this.submitRequest()}>
            <h2>
              Request to Book
            </h2>
          </div>
          <p>
            {'You won\'t be charged'}
          </p>
        </div>
      </div>
    );
  }
}
