import React from 'react';

const SchoolFeedbackPerformanceList = ({ performances, onClick }) => {
  return (
    <div>
      {performances.map((performance) => {
        return (
          <div className="list-row" key={performance.id}>
            <div className="dance-title">{performance.danceTitle}</div>
            <div className="dance-details">
              {`${performance.academicLevel} | ${performance.danceSize} | ${performance.competitionLevel} | ${performance.school}`}
            </div>
            <div className="dance-score">{`Average Score: ${performance.averageScore}`}</div>
            <a className="dance-button" onClick={() => onClick(performance)}>See Details > </a>
            {performance.selected ? <a className="dance-button">Select as Winner</a> : null}
          </div>
        )
      })
      }
    </div>
  );
}

export default SchoolFeedbackPerformanceList;