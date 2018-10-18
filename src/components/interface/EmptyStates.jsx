import React from 'react';
import EventEmptyImage from '../images/Events_empty.jpg';
import AdjEmptyImage from '../images/Adjudications_empty.jpg';
import performanceEmptyImage from '../images/Performances_empty.jpg';

class EmptyState extends React.Component {
  render() {
    const { type, title, subtitle } = this.props;
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
      <div>
        <img src={image} />
        <p>
          {title}
        </p>
        <p>
          {subtitle}
        </p>
      </div>
    );
  }
}
export default EmptyState;
