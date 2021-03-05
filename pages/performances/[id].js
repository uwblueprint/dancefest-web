import React, { useState } from 'react'; // React
import Layout from '@components/Layout'; // Layout wrapper
import { getSession } from 'next-auth/client'; // Session handling

// Test components
import Title from '@components/Title'; // Title
import DancerRedJump from '@assets/dancer-red-jump.svg'; // Jumping Dancer SVG
import styles from '@styles/pages/PerformanceDetails.module.scss';

// Page: Settings
export default function PerformanceDetails() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [feedbackAvailable, setFeedbackAvailable] = useState(true);

  return (
    <Layout>
      <div>
        <div>
          <h2 className={styles.performances_details__eventName}>{`OSSDF2021- Let's Dis-dance`}</h2>
        </div>
        <div>
          <Title className={styles.performances__header__pageTitle}>{`1. Somebody To Love`}</Title>
        </div>
        <div className={styles.performance_details__content_container}>
          <div className={styles.performance_details__tabs_container}>
            <div className={`${styles.performance_details__tabs}`}>
              <h3>Performance Details</h3>
            </div>
            <Tab
              selected={selectedTab === 0}
              setSelectedTab={setSelectedTab}
              tabIndex={0}
              setFeedbackAvailable={setFeedbackAvailable}
            >
              Judge 1
            </Tab>
            <Tab
              selected={selectedTab === 1}
              setSelectedTab={setSelectedTab}
              tabIndex={1}
              setFeedbackAvailable={setFeedbackAvailable}
            >
              Judge 2
            </Tab>
            <Tab
              selected={selectedTab === 2}
              setSelectedTab={setSelectedTab}
              tabIndex={2}
              setFeedbackAvailable={setFeedbackAvailable}
            >
              Judge 3
            </Tab>
          </div>
          <div
            className={`${styles.performance_details__content} ${
              !feedbackAvailable && styles.performance_details__no_content_container
            }`}
          >
            {feedbackAvailable ? <AdjudicationContent /> : <EmptyComponent />}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function Tab(props) {
  const handleClick = () => {
    props.setSelectedTab(props.tabIndex);
    props.setFeedbackAvailable(old => !old);
  };

  return (
    <div className={`${styles.judge__tab} ${props.selected && styles.judge__tab_selected}`}>
      <button onClick={handleClick}>
        {/* Event title */}
        <h3>{props.children}</h3>

        <div className={styles.judge__tab_stats}>
          {/* Artistic Score */}
          <span>ARTISTIC: ##</span>

          {/* Technical Score */}
          <span>TECHNICAL: ##</span>

          {/* Cumulative Score */}
          <span>CUMULATIVE: ##</span>
        </div>

        <div className={styles.judge__tab_awards}>
          <h4>AWARD NOMINATIONS: </h4>
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

const AdjudicationContent = () => {
  return (
    <div className={styles.modal__container}>
      <div className={styles.modal}>
        <div>
          <h2>Entry ID</h2>
          <span>{`1`}</span>
        </div>
        <div>
          <h2>Dancer(s)</h2>
          <span>
            {`Madeline, Sophia, Grace, Mia, Evelyn, Molly, Alexa, Ellyana, Kailan, Melissa, Savannah,
          Sela, Raeya, Ella`}
          </span>
        </div>
        <div>
          <h2>Choreographer(s)</h2>
          <span>{`Nancy Vaillancourt & Robbie-Lynn Schreindler`}</span>
        </div>
        <div>
          <h2>School</h2>
          <span>{`Bluevale Collegiate Institute`}</span>
        </div>
        <div>
          <h2>Competition Level</h2>
          <span>{`Advance 1`}</span>
        </div>
        <div>
          <h2>Style</h2>
          <span>{`Jazz`}</span>
        </div>
        <div>
          <h2>Size</h2>
          <span>{`Medium Group`}</span>
        </div>
      </div>
      <div>
        <h2>Awarded:</h2>
        <ul>
          <li>{`Outstanding Performance Advance 1 Medium Group`}</li>
          <li>{`1st Placement Award`}</li>
        </ul>
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
