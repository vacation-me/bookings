import React from 'react';
import _ from 'lodash';
import Calendar from './Calendar/Calendar';
import CalendarTitle from './Calendar/CalendarTitle';
import Pricing from './Pricing/Pricing';
import Guests from './Guests/Guests';
import SuccessMsg from './SuccessMsg/SuccessMsg';
import SubmitBtn from './SubmitBtn/SubmitBtn';
import styles from './App.css';
import downArrow from '../styles/icons/down_arrow.svg';
import upArrow from '../styles/icons/up_arrow.svg';

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
      displayWidth: 1124,
      displayModalView: false,
      displayBreakpoint: 1123,
      checkOutStage: 0,
      price: 0,
      cleaningFee: 0,
      maxGuests: 0,
      minStay: 0,
      serviceFee: 0,
      isSelectingGuests: false,
      showPopUpInfo: 0,
    };
    this.setNextStage = this.setNextStage.bind(this);
    this.setSelectedDate = this.setSelectedDate.bind(this);
    this.getCalendarTitle = this.getCalendarTitle.bind(this);
    this.updateGuestCount = this.updateGuestCount.bind(this);
    this.submitRequest = this.submitRequest.bind(this);
    this.clearDates = this.clearDates.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
    this.updateGuestCount = this.updateGuestCount.bind(this);
    this.toggleGuestSelectView = this.toggleGuestSelectView.bind(this);
    this.toggleInfoPopUp = this.toggleInfoPopUp.bind(this);
    this.submitRequest = this.submitRequest.bind(this);
    this.renderGuestTitle = this.renderGuestTitle.bind(this);
  }

  componentDidMount() {
    if (this.props.id) {
      this.setState({ ...this.props });
    } else {
      fetch('/api/listing_info')
        .then(res => res.json())
        .then((body) => { this.setState({ ...body }); })
        .catch((err) => { throw err; });
      this.setState({ displayWidth: window.innerWidth });
      window.addEventListener('resize', _.throttle(() => {
        this.setState({ displayWidth: window.innerWidth });
      }), 500);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize');
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
      month,
      year,
    } = this.state;

    let { checkOutStage } = this.state;

    if (requestedDates[0] === undefined) {
      requestedDates[0] = new Date(year, month, selectedDate);
    } else if (requestedDates[1] === undefined) {
      requestedDates[1] = new Date(year, month, selectedDate);
    }
    if (requestedDates[0] && requestedDates[1]) {
      checkOutStage = 3;
    } else {
      checkOutStage = 2;
    }
    this.setState({
      requestedDates,
      checkOutStage,
    });
  }

  getCalendarTitle(titleStage) {
    const { requestedDates, checkOutStage } = this.state;
    const titles = ['Check-in', 'Check-out'];
    let classNames = '';
    let text = '';
    // check if title respective date has been selected
    if (requestedDates[titleStage] === undefined) {
      text = titles[titleStage];
    } else {
      text = `${requestedDates[titleStage].getMonth() + 1}/${requestedDates[titleStage].getDate()}/${requestedDates[titleStage].getFullYear()}`;
    }
    if (checkOutStage === titleStage + 1) {
      classNames = styles.currentStage;
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
    const {
      requestedDates,
      id,
      checkOutStage,
      displayBreakpoint,
      displayWidth,
    } = this.state;
    let { displayModalView } = this.state;
    if (displayWidth < displayBreakpoint && !displayModalView) {
      displayModalView = true;
      this.setState({ displayModalView });
      return;
    }
    if (checkOutStage !== 3) {
      this.setState({ checkOutStage: checkOutStage === 0 ? 1 : 2 });
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

    // get array indeces from requested dates
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
    const { guestCount, isSelectingGuests } = this.state;
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
      <div className={styles.subComponent} id="toggle-guest-view" onClick={this.toggleGuestSelectView}>
        <h3>
          {output}
        </h3>
        <img className={styles.icon} src={icon} alt="" />
      </div>
    );
  }

  render() {
    const {
      checkOutStage,
      isSelectingGuests,
      price,
      displayBreakpoint,
      displayModalView,
      displayWidth,
      requestedDates,
    } = this.state;

    return (
      <div className={styles.container} id="container">
        {checkOutStage === 4 && <SuccessMsg setNextStage={this.setNextStage} />}
        {((displayWidth > displayBreakpoint && !displayModalView) || displayModalView) ? (
          <div className={styles.bookingsContainer} id="bookings-container">
            <div className={styles.bookings} id="bookings">
              {displayModalView && (
                <button
                  className={styles.closeModalBtn}
                  type="button"
                  onClick={() => this.setState({ displayModalView: false })}
                >
                  X
                </button>
              )}
              <h3>
                <span className={styles.price}>
                  {`$${price} `}
                </span>
                per night
              </h3>
              <hr />
              <CalendarTitle renderTitle={this.getCalendarTitle} />
              {(checkOutStage === 1 || checkOutStage === 2)
                && (
                  <Calendar
                    {...this.state}
                    changeMonth={this.changeMonth}
                    selectDate={this.setSelectedDate}
                    clearDates={this.clearDates}
                  />
                )
              }
              {this.renderGuestTitle.call(this)}
              {isSelectingGuests
                && (
                  <Guests
                    {...this.state}
                    updateGuestCount={this.updateGuestCount}
                    toggleView={this.toggleGuestSelectView}
                  />
                )
              }
              {checkOutStage === 3 && (
                <Pricing
                  {...this.state}
                  toggleInfo={this.toggleInfoPopUp}
                />
              )}
              <SubmitBtn submitRequest={this.submitRequest} className={styles.bookBtn} />
              <p className={styles.text}>
                {'You won\'t be charged'}
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.footerView} id="footer-view">
            <h3>
              <span className={styles.price}>
                {`$${price} `}
              </span>
              per night
            </h3>
            <SubmitBtn submitRequest={this.submitRequest} className={styles.footerSubmitBtn} />
          </div>
        )}
      </div>
    );
  }
}
