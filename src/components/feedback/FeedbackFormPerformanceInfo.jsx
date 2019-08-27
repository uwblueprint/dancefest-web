import React from 'react';
// TODO: change empty image
import PerformanceEmptyImage from '../images/Performances_empty.png';

const FeedbackFormPerformanceInfo = ({ adjudications, selected, handleChange }) => {
  if (Object.entries(adjudications).length !== 0) {

    const judgeComments = adjudications.map((adjudication => {

      return (
        <div className="comment-block" key={adjudication['id']}>
          <b>Judge {adjudication['tabletId']}</b>
          <div className="comment">
            <div className="category-title comment">General Comment: </div>
            <input adjudicationId={adjudication.id} performanceId={adjudication.performanceId} name="notes" label="Notes" onChange={handleChange} value={adjudication.notes} />
          </div>
          <div className="score">
            <span className="category-title">Artistic Score: </span>
            <input adjudicationId={adjudication.id} performanceId={adjudication.performanceId} name="artisticMark" label="ArtisticMark" type="number" onChange={handleChange} value={adjudication.artisticMark} />
          </div>
          <div className="score">
            <span className="category-title">Technical Score: </span>
            <input adjudicationId={adjudication.id} performanceId={adjudication.performanceId} name="technicalMark" label="TechnicalMark" type="number" onChange={handleChange} value={adjudication.technicalMark} />
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

export default FeedbackFormPerformanceInfo;