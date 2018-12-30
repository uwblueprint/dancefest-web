import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

const Loading = ({
  color,
  height,
  type,
  width
}) => (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
    <ReactLoading color={color} height={height} type={type} width={width} />
  </div>
);

Loading.propTypes = {
  color: PropTypes.string,
  height: PropTypes.number,
  type: PropTypes.string,
  width: PropTypes.number
};

Loading.defaultProps = {
  color: '#de2706',
  height: 50,
  type: 'spin',
  width: 50
};

export default Loading;
