import React from 'react';
// TODO: change empty image
import PerformanceEmptyImage from '../images/Performances_empty.png';

const SchoolFeedbackPerformanceInfo = ({ adjudications, selected }) => {
  if (Object.entries(adjudications).length !== 0) {

    const judgeComments = adjudications.map((adjudication => {

      return (
        <div className="comment-block" key={adjudication['id']}>
          <b>Judge {adjudication['tabletId']}</b>
          <div className="comment">
            <div className="category-title comment">General Comment: </div>{adjudication['notes']}
          </div>
          <div className="score">
            <span className="category-title">Artistic Score: </span>{adjudication['artisticMark']}
          </div>
          <div className="score">
            <span className="category-title">Technical Score: </span>{adjudication['technicalMark']}
          </div>
        </div>
      )

    }));

    return (
      <div>
        <div className="selected-title">{selected['danceTitle']}</div>
        {judgeComments}
      </div>
    );
  }

  // this is the empty view
  return (
    <div>
      <div className="empty-view">
        <img src={PerformanceEmptyImage} alt={`Empty Section`} width="300" />
        <p className="empty-view-text">Select a nominated dance to see dance details.</p>
      </div>
    </div>
  );
}

export default SchoolFeedbackPerformanceInfo;