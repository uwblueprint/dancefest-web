import React from 'react';
import PropTypes from 'prop-types';

// Will contain a form label which will get properties passed in

const FormLabel = ({ jsonfield }) => (
  <label>
    {jsonfield}
  </label>
);

FormLabel.propTypes = {
  jsonfield: PropTypes.string.isRequired
};

export default FormLabel;
