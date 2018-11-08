import React from 'react';
import PropTypes from 'prop-types';

const Score = ({ type, score, scoreName }) => {
  const outerStyles = type === 'subtotal' ? ({
    flex: 3, backgroundColor: '#cfcfcf', height: '100%', margin: '0', borderRight: '3px solid white', textAlign: 'center'
  }) : ({
    flex: 1, backgroundColor: '#c61100', height: '100%', margin: '0', textAlign: 'center'
  });

  const innerStyles = {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <div style={outerStyles}>
      <div style={innerStyles}>
        {score}
        <br />
        {scoreName}
      </div>
    </div>
  );
};

export default Score;

Score.propTypes = {
  type: PropTypes.oneOf(['subtotal', 'total']).isRequired,
  score: PropTypes.number.isRequired,
  scoreName: PropTypes.string.isRequired
};
