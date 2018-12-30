import React from 'react';
import PropTypes from 'prop-types';

const Score = ({ type, score, scoreName }) => {
  const outerStyles = type === 'subtotal' ? ({
    flex: 3, backgroundColor: '#cfcfcf', height: '100%', margin: '0', borderRight: '3px solid white', textAlign: 'center'
  }) : ({
    flex: 1, backgroundColor: '#c61100', height: '100%', margin: '0', textAlign: 'center', color: 'white'
  });

  const innerStyles = {
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <div style={outerStyles}>
      <div style={innerStyles}>
        <span style={{ fontSize: '36px', fontWeight: 'bold' }}>
          {score}
        </span>
        <span style={{ color: '#99999' }}>
          {scoreName}
        </span>
      </div>
    </div>
  );
};

export default Score;

Score.propTypes = {
  type: PropTypes.oneOf(['subtotal', 'total']).isRequired,
  score: PropTypes.string.isRequired,
  scoreName: PropTypes.string.isRequired
};
