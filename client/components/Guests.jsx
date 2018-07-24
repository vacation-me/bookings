import React from 'react';
import plus from '../styles/icons/plus.svg';
import minus from '../styles/icons/minus.svg';



const Guests = (props) => {
  const renderButton = (type, btnIndex) => {
    //render an icon depending on whether the max guest limit is reached
    //remove click handler and add disabled class if max limit is reached
    let icon = '';
    let incrementor = btnIndex % 2 === 0 ? -1 : 1;
    let clickHandler = () => props.toggleGuestCount(type, incrementor);
    let classNames = 'large-icon';
    
    //check if btn index is even and assign icon variable
    if (btnIndex % 2 === 0) {
      icon = minus;
    } else {
      icon = plus;
    }

    //check if max guest is reacehed and if current index is for adult/children and if operating on plus icon
    if ((props.guestCount.adults + props.guestCount.children >= props.maxGuests && (btnIndex === 1 || btnIndex === 3)) 
      || props.guestCount[type] === 0 && btnIndex % 2 === 0) {
      classNames += ' disabled';
      clickHandler = () => {};
    } else if (props.guestCount[type] === 0) {

    }

    return (<img src={icon} className={classNames} onClick={clickHandler}/>);

  };

  return (
    <div id="guest-toggle">
      <div id="adult-guest-toggle">
        <h3>Adults</h3>
        {renderButton('adults', 0)}
        <h3>{props.guestCount.adults}</h3>
        {renderButton('adults', 1)}
      </div>
      <div id="child-guest-toggle">
        <h3>Children</h3>
        {renderButton('children', 2)}
        <h3>{props.guestCount.children}</h3>
        {renderButton('children', 3)}
      </div>
      <div id="infant-guest-toggle">
        <h3>Infants</h3>
        {renderButton('infants', 4)}
        <h3>{props.guestCount.infants}</h3>
        {renderButton('infants',5)}
      </div>
      <p>{`${props.maxGuests} guests maximum. Infants don't count towards the number of guests.`}</p>
      <h4 
        style={{float: 'right', color: 'rgb(51, 218, 205)', marginRight: '10px', cursor: 'pointer'}}
        onClick={props.toggleView}>Close</h4>
    </div>
  );
};

export default Guests;