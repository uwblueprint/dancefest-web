import React from 'react';
import PropTypes from 'prop-types';
import EventEmptyImage from '../images/Events_empty.jpg';
import AdjEmptyImage from '../images/Adjudications_empty.jpg';
import performanceEmptyImage from '../images/Performances_empty.jpg';

const EmptyState = ({ type, title, subtitle }) => {
  let image;
  switch (type) {
    case 'event':
      image = EventEmptyImage;
      break;
    case 'adjudication':
      image = AdjEmptyImage;
      break;
    case 'performance':
    default:
      image = performanceEmptyImage;
      break;
  }

  return (
    <div style={{ textAlign: 'center', margin: '50px' }}>
      <img src={image} alt="" />
      <p>{title}</p>
      <p>{subtitle}</p>
    </div>
  );
};

EmptyState.propTypes = {
  subtitle: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['event', 'adjudication', 'performance']).isRequired,
  title: PropTypes.string.isRequired
};

export default EmptyState;
