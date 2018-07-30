import React from 'react';
import PropTypes from 'prop-types';

const SubmitBtn = (props) => {
  const { submitRequest, id } = props;
  return (
    <button className="sub-component" id={id} onClick={() => submitRequest()} type="button">
        Request to Book
    </button>
  );
};

SubmitBtn.propTypes = {
  submitRequest: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default SubmitBtn;
