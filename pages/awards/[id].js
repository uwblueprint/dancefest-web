import React, { useEffect, useState } from 'react'; // React
import axios from 'axios'; // Axios
import Loader from 'react-loader-spinner'; // Spinning loader
import Layout from '@components/Layout'; // Layout wrapper
import Button from '@components/Button'; // Button Component
import ScoreBasedAwards from '@components/awards/ScoreBasedAwards'; // Score Based Awards View
import { getSession } from 'next-auth/client'; // Session handling
import { getAward } from 'pages/api/awards/get'; // Helper method to get award details by ID

import Title from '@components/Title'; // Title
import DancerRedJump from '@assets/dancer-red-jump.svg'; // Jumping Dancer SVG
import PlayIcon from '@assets/play.svg';
import styles from '@styles/pages/AwardDetails.module.scss';

export default function DetailsRoute({ award }) {
  console.log('award is');
  console.log(award);
  return award.type === 'SPECIAL' ? (
    <AwardDetails award={award} />
  ) : award.type === 'DANCE_ARTISTRY' ? (
    <AwardDetails award={award} />
  ) : (
    <ScoreBasedAwards />
  );
}

// Page: Award Details
function AwardDetails({ award }) {
  const [selectedTab, setSelectedTab] = useState(-1);
  const [showAwardSummary, setShowAwardSummary] = useState(true);
  const [feedbackAvailable, setFeedbackAvailable] = useState(true);
  const [feedback, setFeedback] = useState({});
  const [isAwardFinalized, setIsAwardFinalized] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleTabClick = () => {};

  useEffect(() => {
    setIsAwardFinalized(award.is_finalized);
  }, []);

  useEffect(() => {
    // Make sure that the index is in bounds and not -1
    if (selectedTab !== -1 && selectedTab < award.awards_performances.length) {
      setShowAwardSummary(false);
      setFeedback(award.awards_performances[selectedTab]);
      setFeedbackAvailable(true);
    } else if (selectedTab === -1) {
      setFeedback(false);
      setShowAwardSummary(true);
    }
  }, [selectedTab]);

  async function finalizeAward(performance_id) {
    setLoading(true);
    setIsAwardFinalized(true);
    try {
      const resp = await axios({
        method: 'PUT',
        url: '/api/awards/finalize',
        data: {
          awardID: award.id,
          performanceID: performance_id,
        },
      });
      console.log('resp ');
      console.log(resp);
    } catch (err) {
      // Empty catch block
      console.log('Something went wrong ' + err);
    }
    setLoading(false);
  }

  async function unfinalizeAward(performance_id) {
    setLoading(true);
    setIsAwardFinalized(false);
    try {
      const resp = await axios({
        method: 'PUT',
        url: '/api/awards/unfinalize',
        data: {
          awardID: award.id,
          performanceID: performance_id,
        },
      });
      console.log('resp ');
      console.log(resp);
    } catch (err) {
      // Empty catch block
      console.log('Something went wrong ' + err);
    }
    setLoading(false);
  }

  return (
    <Layout>
      <div>
        <div>
          <h2 className={styles.performances_details__eventName}>{`Event Title`}</h2>
        </div>
        <div>
          <Title className={styles.performances__header__pageTitle}>{award.title}</Title>
        </div>
        <div className={styles.performance_details__content_container}>
          <div className={styles.performance_details__tabs_container}>
            <div
              className={`${styles.performance_details__tabs} ${
                showAwardSummary && styles.performance_details__tabs_selected
              }`}
            >
              <button
                onClick={() => {
                  setSelectedTab(-1);
                }}
              >
                <h3>Award Details</h3>
              </button>
            </div>
            {award.awards_performances.map((awards_performance, index) => (
              <Tab
                selected={selectedTab === index}
                setSelectedTab={setSelectedTab}
                tabIndex={index}
                handleClick={handleTabClick}
                nominations={awards_performance.nominator.name}
                key={index}
              >
                {awards_performance.name}
              </Tab>
            ))}
          </div>
          <div
            className={`${styles.performance_details__content} ${
              !feedbackAvailable && styles.performance_details__no_content_container
            }`}
          >
            {showAwardSummary ? (
              <AwardSummary type={award.type} nominations={award.awards_performances.length} />
            ) : feedbackAvailable ? (
              <JudgeFeedback
                feedback={feedback}
                finalizeAward={finalizeAward}
                unfinalizeAward={unfinalizeAward}
                isAwardFinalized={isAwardFinalized}
                loading={loading}
              />
            ) : (
              <EmptyComponent />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function Tab(props) {
  const handleClick = () => {
    props.setSelectedTab(props.tabIndex);
    props.handleClick();
  };

  return (
    <div className={`${styles.judge__tab} ${props.selected && styles.judge__tab_selected}`}>
      <button onClick={handleClick}>
        {/* Event title */}
        <h3>{props.children}</h3>

        <div className={styles.judge__tab_stats}>
          {/* Nominated By */}
          <h2>NOMINATED BY {props.nominations}</h2>
        </div>
      </button>
    </div>
  );
}

const EmptyComponent = () => {
  return (
    <div className={styles.performance_details__no_content}>
      <div>
        <h2>No Feedback Yet</h2>
        <h3>Check again later</h3>
        <img src={DancerRedJump} />
      </div>
    </div>
  );
};

const AwardSummary = ({ type, nominations }) => {
  return (
    <div className={styles.award__summary_container}>
      <div className={styles.award__summary}>
        <div>
          <h2>Type</h2>
          <span>{type}</span>
        </div>
        <div>
          <h2>No. of Nominations</h2>
          <span>{nominations}</span>
        </div>
      </div>
    </div>
  );
};

const JudgeFeedback = ({ feedback, finalizeAward, unfinalizeAward, isAwardFinalized, loading }) => {
  return (
    <div className={styles.judge__feedback_container}>
      <div className={styles.judge__feedback_header}>
        <h3>{feedback.name}</h3>
        <span>
          {loading ? (
            <Button disabled>
              <span>
                <Loader type="Oval" color="#fff" height={15} width={15} />
              </span>
            </Button>
          ) : isAwardFinalized ? (
            <Button variant="contained" onClick={() => unfinalizeAward(feedback.id)}>
              Unfinalize
            </Button>
          ) : (
            <Button variant="contained" onClick={() => finalizeAward(feedback.id)}>
              Finalize
            </Button>
          )}
        </span>
      </div>

      <div className={styles.performance_details__score_content}>
        <div className={styles.performance_details__score_card}>
          <div style={{ textAlign: 'center' }}>
            <h1>{feedback.technicalScore}</h1>
            <h2>{`Technical`}</h2>
          </div>
        </div>
        <div className={styles.performance_details__score_card}>
          <div style={{ textAlign: 'center' }}>
            <h1>{feedback.artisticScore}</h1>
            <h2>{`ARTISTIC`}</h2>
          </div>
        </div>
        <div
          className={`${styles.performance_details__score_card} ${styles.performance_details__score_card_cumulative}`}
        >
          <div style={{ textAlign: 'center' }}>
            <h1>{feedback.cumulativeScore}</h1>
            <h2>{`CUMULATIVE`}</h2>
          </div>
        </div>
      </div>
      {feedback.adjudications.map((adjudication, index) => (
        <IndividualFeedback feedback={adjudication} key={index} />
      ))}
    </div>
  );
};

const IndividualFeedback = ({ feedback }) => {
  const notes = 'None Entered';

  return (
    <div className={styles.individual__feedback_container}>
      <div className={styles.individual__feedback_header}>
        <h3>{feedback.user.name}</h3>
        <h2>{`ARTISTIC: ${feedback.artistic_mark}`}</h2>
        <h2>{`TECHNICAL: ${feedback.technical_mark}`}</h2>
        <h2>{`CUMULATIVE: ${feedback.cumulative_mark}`}</h2>
      </div>
      <h2>NOTES</h2>
      <p className={styles.individual__feedback_notes}>{feedback.notes || notes}</p>
      <div className={styles.judge__feedback_audio_player}>
        <p>{`OSSDF2021_1.mp3`}</p>
        <span>
          <p>{`3:07`}</p>
          <img src={PlayIcon} />
        </span>
      </div>
    </div>
  );
};

// Run: server side
export async function getServerSideProps(context) {
  // Collect session
  const session = await getSession(context);

  // If session does not exist
  if (!session) {
    return {
      redirect: {
        // Redirect user to login page
        destination: '/login',
        permanent: false,
      },
    };
  }

  // Collect eventID from URL params
  const { id: awardID } = context.params;

  // TODO: Get award details from award ID, parse and pass back details as prop
  let award;

  const filter = { id: parseInt(awardID) };
  award = await getAward(filter);

  if (!award) {
    return {
      redirect: {
        // Redirect user to login page
        destination: '/awards',
        permanent: false,
      },
    };
  }

  award = JSON.parse(JSON.stringify(award));

  return {
    props: {
      award,
    },
  };
}
