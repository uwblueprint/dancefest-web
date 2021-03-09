import React, { useState } from 'react'; // React
import Layout from '@components/Layout'; // Layout wrapper
import Button from '@components/Button'; // Button Component
import Dropdown from '@components/Dropdown'; // Dropdown component
import { getSession } from 'next-auth/client'; // Session handling

import Title from '@components/Title'; // Title
import TextInput from '@components/Input'; // TextInput Component
import DancerRedJump from '@assets/dancer-red-jump.svg'; // Jumping Dancer SVG
import PlayIcon from '@assets/play.svg';
import styles from '@styles/pages/PerformanceDetails.module.scss';

// Page: Settings
export default function PerformanceDetails() {
  const [selectedTab, setSelectedTab] = useState(-1);
  const [showPerformanceSummary, setShowPerformanceSummary] = useState(true);
  const [feedbackAvailable, setFeedbackAvailable] = useState(true);

  const handleTabClick = () => {
    setFeedbackAvailable(!feedbackAvailable); // TODO: Change this!!
    setShowPerformanceSummary(false);
  };

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
            <div
              className={`${styles.performance_details__tabs} ${
                showPerformanceSummary && styles.performance_details__tabs_selected
              }`}
            >
              <button
                onClick={() => {
                  setShowPerformanceSummary(true);
                  setSelectedTab(-1);
                }}
              >
                <h3>Performance Details</h3>
              </button>
            </div>
            <Tab
              selected={selectedTab === 0}
              setSelectedTab={setSelectedTab}
              tabIndex={0}
              handleClick={handleTabClick}
            >
              Judge 1
            </Tab>
            <Tab
              selected={selectedTab === 1}
              setSelectedTab={setSelectedTab}
              tabIndex={1}
              handleClick={handleTabClick}
            >
              Judge 2
            </Tab>
            <Tab
              selected={selectedTab === 2}
              setSelectedTab={setSelectedTab}
              tabIndex={2}
              handleClick={handleTabClick}
            >
              Judge 3
            </Tab>
          </div>
          <div
            className={`${styles.performance_details__content} ${
              !feedbackAvailable && styles.performance_details__no_content_container
            }`}
          >
            {showPerformanceSummary ? (
              <PerformanceSummary />
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

const PerformanceSummary = () => {
  return (
    <div>
      <div className={styles.performance__summary_container}>
        <div className={styles.performance__summary_col}>
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
        </div>
        <div className={styles.performance__summary_col}>
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
      </div>
      <div className={styles.performance_details__awards_list}>
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

const JudgeFeedback = () => {
  const [editMode, setEditMode] = useState(false);
  const [notes, setNotes] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  );

  const options = [
    {
      value: 'Most Inspiring Medium Group Performance',
      label: 'Most Inspiring Medium Group Performance',
    },
    {
      value: 'Most Exciting Medium Group Performance',
      label: 'Most Exciting Medium Group Performance',
    },
    {
      value: 'Most Inspiring Large Group Performance',
      label: 'Most Inspiring Large Group Performance',
    },
  ];

  const [specialAward, setSpecialAward] = useState(`Sharp Movements`);

  return (
    <div className={styles.judge__feedback_container}>
      <div className={styles.judge__feedback_header}>
        <h2>Notes</h2>
        {editMode ? (
          <span>
            <Button
              variant="outlined"
              onClick={() => {
                setEditMode(false);
              }}
              className={styles.judge__feedback_buttons_spacing}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setEditMode(false);
              }}
            >
              Save
            </Button>
          </span>
        ) : (
          <Button
            variant="outlined"
            onClick={() => {
              setEditMode(true);
            }}
          >
            Edit Feedback
          </Button>
        )}
      </div>
      <div>
        {editMode ? (
          <div className={styles.judge__feedback_notes_input}>
            <textarea
              onChange={e => {
                setNotes(e.target.value);
              }}
            >
              {notes}
            </textarea>
          </div>
        ) : (
          <p>{notes}</p>
        )}
      </div>
      <div className={styles.judge__feedback_audio_player}>
        <p>{`OSSDF2021_1.mp3`}</p>
        <span>
          <p>{`3:07`}</p>
          <img src={PlayIcon} />
        </span>
      </div>
      <div>
        <h2>Nominated for:</h2>
        {editMode ? (
          <Dropdown
            selected={options[0]}
            options={options}
            wrapperClassName={styles.judge__feedback_dropdown_wrapper}
          />
        ) : (
          <p>{`Most Inspiring Medium Group Performance`}</p>
        )}
      </div>
      <div>
        <h2>Special Award:</h2>
        {editMode ? (
          <TextInput
            fullWidth
            onChange={setSpecialAward}
            value={specialAward}
            wrapperClassName={styles.judge__feedback_input_wrapper}
          />
        ) : (
          <p>{specialAward}</p>
        )}
      </div>

      <div className={styles.performance_summary__score_content}>
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
