import React, { useState } from 'react'; // React
import Layout from '@components/Layout'; // Layout wrapper
import Button from '@components/Button'; // Button Component
import { getSession } from 'next-auth/client'; // Session handling

import Title from '@components/Title'; // Title
import DancerRedJump from '@assets/dancer-red-jump.svg'; // Jumping Dancer SVG
import PlayIcon from '@assets/play.svg';
import styles from '@styles/pages/AwardDetails.module.scss';

// Page: Award Details
export default function AwardDetails() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [showPerformanceSummary, setShowPerformanceSummary] = useState(false);
  const [feedbackAvailable, setFeedbackAvailable] = useState(true);

  const handleTabClick = () => {
    setFeedbackAvailable(old => !old); // TODO: Change this!!
    setShowPerformanceSummary(false);
  };

  return (
    <Layout>
      <div>
        <div>
          <h2 className={styles.performances_details__eventName}>{`OSSDF2021- Let's Dis-dance`}</h2>
        </div>
        <div>
          <Title
            className={styles.performances__header__pageTitle}
          >{`Most Inspiring Medium Group Performance Awards`}</Title>
        </div>
        <div className={styles.performance_details__content_container}>
          <div className={styles.performance_details__tabs_container}>
            <div
              className={`${styles.performance_details__tabs} ${
                showPerformanceSummary && styles.performance_details__tabs_selected
              }`}
            >
              <button
                onClick={() => {
                  setShowPerformanceSummary(true);
                  setFeedbackAvailable(true);
                  setSelectedTab(-1);
                }}
              >
                <h3>Award Details</h3>
              </button>
            </div>
            <Tab
              selected={selectedTab === 0}
              setSelectedTab={setSelectedTab}
              tabIndex={0}
              handleClick={handleTabClick}
            >
              You’re The One That I Want
            </Tab>
            <Tab
              selected={selectedTab === 1}
              setSelectedTab={setSelectedTab}
              tabIndex={1}
              handleClick={handleTabClick}
            >
              You’re The One That I Want
            </Tab>
            <Tab
              selected={selectedTab === 2}
              setSelectedTab={setSelectedTab}
              tabIndex={2}
              handleClick={handleTabClick}
            >
              You’re The One That I Want
            </Tab>
          </div>
          <div
            className={`${styles.performance_details__content} ${
              !feedbackAvailable && styles.performance_details__no_content_container
            }`}
          >
            {showPerformanceSummary ? (
              <AwardSummary />
            ) : feedbackAvailable ? (
              <JudgeFeedback />
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
          <span>NOMINATED BY {props.nominator}</span>
        </div>

        <div className={styles.judge__tab_awards}>
          <Button variant="contained">Finalize</Button>
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

const AwardSummary = () => {
  return (
    <div>
      <div className={styles.modal__container}>
        <div className={styles.modal}>
          <div>
            <h2>Type</h2>
            <span>{`Performance`}</span>
          </div>
          <div>
            <h2>No. of Nominations</h2>
            <span>{`1`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const JudgeFeedback = () => {
  return (
    <div className={styles.judge__feedback_container}>
      <div className={styles.judge__feedback_header}>
        <h3>{`You’re The One That I Want`}</h3>
        <span>
          <Button variant="contained" onClick={() => {}}>
            Finalize
          </Button>
        </span>
      </div>

      <div className={styles.performance_details__score_content}>
        <div className={styles.performance_details__score_card}>
          <div style={{ textAlign: 'center' }}>
            <h1>{`88`}</h1>
            <h2>{`Technical`}</h2>
          </div>
        </div>
        <div className={styles.performance_details__score_card}>
          <div style={{ textAlign: 'center' }}>
            <h1>{`88`}</h1>
            <h2>{`ARTISTIC`}</h2>
          </div>
        </div>
        <div
          className={`${styles.performance_details__score_card} ${styles.performance_details__score_card_cumulative}`}
        >
          <div style={{ textAlign: 'center' }}>
            <h1>{`88`}</h1>
            <h2>{`CUMULATIVE`}</h2>
          </div>
        </div>
      </div>
      {/* {judges.map(v => {
        <IndividualFeedback key={v} />;
      })} */}
      <IndividualFeedback />
      <IndividualFeedback />
      <IndividualFeedback />
    </div>
  );
};

const IndividualFeedback = () => {
  const notes =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

  return (
    <div className={styles.individual__feedback_container}>
      <div className={styles.individual__feedback_header}>
        <h3>{`Judge 1`}</h3>
        <h2>{`ARTISTIC: 90.9`}</h2>
        <h2>{`TECHNICAL: 92.5`}</h2>
        <h2>{`CUMULATIVE: 96.1`}</h2>
      </div>
      <h2>NOTES</h2>
      <p className={styles.individual__feedback_notes}>{notes}</p>
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

  // Else, return
  return {
    props: {},
  };
}
