import React from 'react';
import PropTypes from 'prop-types';
import styles from './Guests.css';

const Guests = (props) => {
  const {
    guestCount,
    maxGuests,
    toggleView,
    updateGuestCount,
    icons: {
      plus,
      minus,
    },
  } = props;
  const renderButton = (type, btnIndex) => {
    // render an icon depending on whether the max guest limit is reached
    // remove click handler and add disabled class if max guest limit is reached
    let icon = plus;
    const incrementor = btnIndex % 2 === 0 ? -1 : 1;
    let clickHandler = () => updateGuestCount(type, incrementor);
    let classNames = styles.icon;
    // check if btn index is even and assign icon variable
    if (btnIndex % 2 === 0) {
      icon = minus;
    }
    // check if max guest is reacehed and if current index is for
    // adult/children and if operating on plus icon
    if ((guestCount.adults + guestCount.children >= maxGuests
        && (btnIndex === 1 || btnIndex === 3))
      || (guestCount[type] === 0 && btnIndex % 2 === 0)
      || (btnIndex === 0 && guestCount.adults === 1)) {
      classNames += ` ${styles.disabled}`;
      clickHandler = null;
    }

    return (
      <img 
        src={icon} 
        id={`guest-btn-${btnIndex}`} 
        className={classNames} 
        onClick={clickHandler}
      />
    );
  };

  return (
    <div className={styles.guestToggle} id="guest-toggle">
      <div className={styles.adultGuestToggle} id="adult-guest-toggle">
        <p className={styles.guestLabel}>
          Adults
        </p>
        {renderButton('adults', 0)}
        <p className={`${styles.guestCount} guest-count`}>
          {guestCount.adults}
        </p>
        {renderButton('adults', 1)}
      </div>

      <div className={styles.childGuestToggle} id="child-guest-toggle">
        <p className={styles.guestLabel}>
          Children (2-12)
        </p>
        {renderButton('children', 2)}
        <p className={`${styles.guestCount} guest-count`}>
          {guestCount.children}
        </p>
        {renderButton('children', 3)}
      </div>
      <div className={styles.infantGuestToggle} id="infant-guest-toggle">
        <p className={styles.guestLabel}>
          Infants (under 2)
        </p>
        {renderButton('infants', 4)}
        <p className={`${styles.guestCount} guest-count`}>
          {guestCount.infants}
        </p>
        {renderButton('infants', 5)}
      </div>
      <p className={styles.text}>
        {`${maxGuests} guests maximum. Infants don't count towards the number of guests.`}
      </p>
      <button
        style={{
          float: 'right',
          color: 'rgb(51, 218, 205)',
          marginRight: '10px',
          cursor: 'pointer',
          border: 'none',
        }}
        onClick={toggleView}
        type="button"
      >
        Close
      </button>
    </div>
  );
};

Guests.propTypes = {
  maxGuests: PropTypes.number.isRequired,
  toggleView: PropTypes.func.isRequired,
  updateGuestCount: PropTypes.func.isRequired,
};


export default Guests;
