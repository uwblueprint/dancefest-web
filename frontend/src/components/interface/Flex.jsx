import React from 'react';
import PropTypes from 'prop-types';

const Flex = ({ children }) => {
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
    <div style={{ display: 'flex' }}>
      {children}
    </div>
  );
};

export default Flex;

Flex.propTypes = {
  type: PropTypes.oneOf(['subtotal', 'total']).isRequired,
  score: PropTypes.number.isRequired,
  scoreName: PropTypes.string.isRequired
};
