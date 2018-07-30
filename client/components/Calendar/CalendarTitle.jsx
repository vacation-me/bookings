import React from 'react';
import PropTypes from 'prop-types';
import styles from './Calendar.css';
import rightArrow from '../../styles/icons/right_arrow.svg';


const CalendarTitle = (props) => {
  const { renderTitle } = props;
  return (
    <div className={styles.subComponent}>
      {renderTitle(0)}
      <img className={styles.icon} src={rightArrow} alt="arrow-icon" />
      {renderTitle(1)}
    </div>
  );
};

CalendarTitle.propTypes = {
  renderTitle: PropTypes.func.isRequired,
};

export default CalendarTitle;
