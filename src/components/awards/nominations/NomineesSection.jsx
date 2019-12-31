import React from 'react';
import PerformanceEmptyImage from '../../images/Performances_empty.png';

const NomineesSection = ({ award, adjudications, selected }) => {
    if (Object.entries(adjudications).length !== 0) {

        // temporary
        if (!award) {
            award = 1;
        }
        
        let nominatedAwards = {};
        adjudications.forEach(entry => {
            entry['nominationComment'].forEach(comment => {
                if (nominatedAwards[comment['awardId']]) {
                    nominatedAwards[comment['awardId']] += 1;
                } else {
                    nominatedAwards[comment['awardId']] = 1;
                }
            });
        });
        const timesNominated = nominatedAwards[award];

        let otherNominations = 0;
        Object.keys(nominatedAwards).forEach(function(key) {
            if (key != award) {
                otherNominations += 1;
            }
        });

        const judgeComments = adjudications.map((adjudication => {
            var nominatedComment = adjudication['nominationComment'].find(function (element) {
                return element['awardId'] == award;
            });

            return (
                <div className="comment-block" key={adjudication['id']}>
                    <b>Judge {adjudication['tabletId']}</b>
                    <div className="comment">
                        <div className="category-title comment">Nomination Comment: </div>{nominatedComment['comment']}
                    </div>
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
                <div className="selected-subtitle">Nominations: {timesNominated}</div>
                <div className="selected-subtitle">{selected['danceTitle']} was also nominated for {otherNominations} awards.</div>
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

export default NomineesSection;