import React, { useState, useEffect } from 'react'; // React
import axios from 'axios'; // axios
import Layout from '@components/Layout'; // Layout wrapper
import { getSession } from 'next-auth/client'; // Session handling
import { useRouter } from 'next/router'; // Routing
import Navigation from '@containers/Navigation'; // Navigation state

/* Page components */
import Tab from '@components/performance-details/Tab'; // Tab
import EmptyComponent from '@components/performance-details/EmptyComponent'; // EmptyComponent
import JudgeFeedback from '@components/performance-details/JudgeFeedback'; // JudgeFeedback
import PerformanceSummary from '@components/performance-details/PerformanceSummary'; // PerformanceSummary

import Loader from 'react-loader-spinner'; // Loading spinner
import Title from '@components/Title'; // Title
import styles from '@styles/pages/PerformanceDetails.module.scss';
import { formatPerformance } from '@utils/performances'; // Format performance util

// Page: Settings
export default function PerformanceDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { event } = Navigation.useContainer();

  const [loading, setLoading] = useState(false);
  const [performance, setPerformance] = useState(null);
  const [selectedTab, setSelectedTab] = useState(-1);

  const showPerformanceDetails = selectedTab === -1;
  const showJudgeFeedback = selectedTab >= 0;

  const getPerformance = async () => {
    setLoading(true);

    try {
      const response = await axios({
        method: 'get',
        url: `/api/performances/get?id=${id}`,
      });
      const formattedPerformance = formatPerformance(response.data);
      setPerformance(formattedPerformance);
    } catch {
      // Temporary solution, as error UI has not been implemented
      router.push('/performances');
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!event) {
      return;
    }
    // TODO: Validate that the performance id is from the currently selected event id (from navigation state)
    getPerformance();
  }, [event]);

  return (
    <Layout>
      {loading || performance === null ? (
        <div className={styles.performance_details__loader_wrapper}>
          <Loader type="Oval" color="#c90c0f" height={80} width={80} />
        </div>
      ) : (
        <>
          <div>
            <h2 className={styles.performances_details__eventName}>{performance.event.name}</h2>
          </div>
          <div>
            <Title className={styles.performances__header__pageTitle}>{performance.name}</Title>
          </div>
          <div className={styles.performance_details__content_container}>
            <div className={styles.performance_details__tabs_container}>
              <div
                className={`${styles.performance_details__tabs} ${
                  showPerformanceDetails && styles.performance_details__tabs_selected
                }`}
              >
                <button onClick={() => setSelectedTab(-1)}>
                  <h3>Performance Details</h3>
                </button>
              </div>
              {performance.adjudications.map((adjudication, i) => (
                <Tab
                  key={i}
                  adjudication={adjudication}
                  selected={selectedTab === i}
                  handleClick={() => setSelectedTab(i)}
                >
                  {adjudication.user.name}
                </Tab>
              ))}
            </div>
            <div
              className={`${styles.performance_details__content} ${
                !showJudgeFeedback && styles.performance_details__no_content_container
              }`}
            >
              {performance && showPerformanceDetails ? (
                <PerformanceSummary performance={performance} />
              ) : performance && showJudgeFeedback ? (
                <JudgeFeedback adjudication={performance.adjudications[selectedTab]} />
              ) : (
                <EmptyComponent />
              )}
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}

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
