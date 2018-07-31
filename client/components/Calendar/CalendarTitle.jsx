import React from 'react';
import PropTypes from 'prop-types';
import styles from './Calendar.css';


const CalendarTitle = (props) => {
  const { renderTitle, icons: { checkInArrow } } = props;
  return (
    <div className={styles.subComponent}>
      {renderTitle(0)}
      <img className={styles.icon} src={checkInArrow} alt="arrow-icon" />
      {renderTitle(1)}
    </div>
  );
};

CalendarTitle.propTypes = {
  renderTitle: PropTypes.func.isRequired,
};

export default CalendarTitle;
