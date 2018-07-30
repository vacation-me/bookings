import React from 'react';
import PropTypes from 'prop-types';
import styles from '../App.css';

const SubmitBtn = (props) => {
  const { submitRequest, className } = props;
  return (
    <button className={`${styles.subComponent} ${className}`} onClick={() => submitRequest()} type="button">
        Request to Book
    </button>
  );
};

SubmitBtn.propTypes = {
  submitRequest: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default SubmitBtn;
