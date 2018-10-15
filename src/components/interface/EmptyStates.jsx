import React from 'react';


function Empty(props) {
  if (props.events) {
    return (<img src={require('../images/Events_empty.jpg')} />);
  } if (props.adjudication) {
    return (<img src={require('../images/Adjudications_empty.jpg')} />);
  } if (props.performances) {
    return (<img src={require('../images/Performances_empty.jpg')} />);
  }
}

class EmptyState extends React.Component {
  constructor(props) {
    super(props);

    this.state = { events: false };
    this.state = { adjudication: false };
    this.state = { performances: false };
  }

  render() {
    return (<Empty />);
  }
}
export default EmptyState;
