import React, { useEffect, useState } from 'react'; // React
import axios from 'axios'; // Axios
import { useRouter } from 'next/router'; // Collect Router
import Loader from 'react-loader-spinner'; // Spinning loader
import Layout from '@components/Layout'; // Layout wrapper
import Button from '@components/Button'; // Button Component
import ScoreBasedAwards from '@components/awards/ScoreBasedAwards'; // Score Based Awards View
import { getSession } from 'next-auth/client'; // Session handling
import { getAward } from 'pages/api/awards/get'; // Helper method to get award details by ID
import Modal from '@components/Modal.js'; // Modal component

import Title from '@components/Title'; // Title
import DancerRedJump from '@assets/dancer-red-jump.svg'; // Jumping Dancer SVG
import PlayIcon from '@assets/play.svg'; // Play icon
import styles from '@styles/pages/AwardDetails.module.scss';

export default function DetailsRoute({ award }) {
  return award.type === 'SCORE_BASED' && !award.is_finalized ? (
    <ScoreBasedAwards award={award} />
  ) : (
    <AwardDetails award={award} />
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

  const router = useRouter();

  // Confirmation Modal
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [performanceToFinalize, setPerformanceToFinalize] = useState(-1);

  // Delete award confirmation modal
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] = useState(false);

  useEffect(() => {
    if (award.is_finalized) {
      setIsAwardFinalized(true);
      award.awards_performances = award.awards_performances.filter(
        awards_performance => awards_performance.status === 'FINALIST'
      );
    }
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

  async function finalizeAward() {
    setLoading(true);
    try {
      await axios({
        method: 'PUT',
        url: '/api/awards/finalize',
        data: {
          awardID: award.id,
          performanceID: performanceToFinalize,
        },
      });
      // Go back to awards
      router.push('/awards');
    } catch {
      // Empty catch block
    }
    setLoading(false);
  }

  async function unfinalizeAward() {
    setLoading(true);
    try {
      await axios({
        method: 'PUT',
        url: '/api/awards/unfinalize',
        data: {
          awardID: award.id,
          performanceID: performanceToFinalize,
        },
      });
      // Go back to awards
      router.push('/awards');
    } catch {
      // Empty catch block
    }
    setLoading(false);
  }

  async function deleteAward() {
    setLoading(true);
    try {
      await axios({
        method: 'PUT',
        url: '/api/awards/delete',
        data: {
          id: award.id,
        },
      });
      // Go back to awards
      router.push('/awards');
    } catch {
      // Empty catch statement
    }
  }

  return (
    <Layout>
      <div>
        <div>
          <h2 className={styles.performances_details__eventName}>{`Event Title`}</h2>
        </div>
        <div className={styles.award_details__header_container}>
          <Title>{award.title}</Title>
          <Button
            className={styles.award_details__delete_button}
            onClick={() => setDeleteConfirmationModalOpen(true)}
            disabled={loading}
          >
            Delete Award
          </Button>
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
                handleClick={() => {}}
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
                setPerformanceToFinalize={setPerformanceToFinalize}
                isAwardFinalized={isAwardFinalized}
                setConfirmationModalOpen={setConfirmationModalOpen}
                loading={loading}
              />
            ) : (
              <EmptyComponent />
            )}
          </div>
        </div>
      </div>
      <Modal
        containerClassName={styles.confirmation__modal}
        title={isAwardFinalized ? `Remove Winner?` : `Select Winner?`}
        open={confirmationModalOpen}
        cancelText="Cancel"
        submitText="Confirm"
        setModalOpen={setConfirmationModalOpen}
        onCancel={() => setConfirmationModalOpen(false)}
        onSubmit={() => {
          isAwardFinalized ? unfinalizeAward() : finalizeAward();
          setPerformanceToFinalize(-1);
        }}
        disableSubmitButton={loading}
      >
        {loading ? (
          <Loader type="Oval" color="#6B778C" height={40} width={40} />
        ) : isAwardFinalized ? (
          <p>This award will now be shown in “Nominations” for you to select a new winner.</p>
        ) : (
          <p>This award will now be shown in the “Finalized” tab.</p>
        )}
      </Modal>
      <Modal
        containerClassName={styles.confirmation__modal}
        title="Delete Award?"
        open={deleteConfirmationModalOpen}
        cancelText="Cancel"
        submitText="Confirm"
        setModalOpen={setDeleteConfirmationModalOpen}
        onCancel={() => setDeleteConfirmationModalOpen(false)}
        onSubmit={deleteAward}
        disableSubmitButton={loading}
      >
        <p>Are you sure you want to delete this award?</p>
      </Modal>
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

const JudgeFeedback = ({
  feedback,
  setConfirmationModalOpen,
  setPerformanceToFinalize,
  isAwardFinalized,
  loading,
}) => {
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
            <Button
              variant="contained"
              onClick={() => {
                setConfirmationModalOpen(true);
                setPerformanceToFinalize(feedback.id);
              }}
              disabled={loading}
            >
              Remove Winner
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                setConfirmationModalOpen(true);
                setPerformanceToFinalize(feedback.id);
              }}
              disabled={loading}
            >
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
