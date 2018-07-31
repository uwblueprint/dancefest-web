import React from 'react';

// Will contain a form label which will get properties passed in

const FormLabel = props => (
  <label>
      {' '}
      {props.jsonfield}
      {' '}
    </label>
);

export default FormLabel;
