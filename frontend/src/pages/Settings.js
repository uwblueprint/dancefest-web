import React, { useMemo } from 'react'; // React
import Layout from 'components/Layout'; // Layout wrapper
import events from 'data/mockEvents';
import Table from 'components/Table';
import styled from 'styled-components';
import Avatar from '@atlaskit/avatar';

const Styles = styled.div`
  padding: 1rem;
  table {
    padding: 20 px;
    border-spacing: 0;
    background-color: #ffffff;
    tr {
      :last-child {
        border-bottom: 2px solid #dfe1e6;
      }
      :hover {
        background-color: #f5f6f7;
      }
    }
    th {
      text-align: left;
      margin: 0;
      padding: 0.5rem;
      text-transform: uppercase;
      font-weight: 700;
      font-size: 16px;
      border-bottom: 2px solid #dfe1e6;
    }
    td {
      margin: 0;
      padding: 0.5rem;
      vertical-align: middle;
      font-weight: 400,
      font-size: 14px,
      :last-child {
        border-right: 0;
      }
    }
  }
`;

const avatarStyles = {
  textAlign: 'center',
  fontWeight: 400,
  color: 'white',
  backgroundColor: '#42526e',
};

// Custom component to render Genres
const Judges = ({ values }) => {
  // Loop through the array and create a badge-like component instead of a comma-separated string
  return (
    <>
      {values.map((judge, idx) => {
        return (
          <Avatar key={idx} name={judge} size="medium">
            {props => (
              <span {...props} style={avatarStyles}>
                {judge}
              </span>
            )}
          </Avatar>
        );
      })}
    </>
  );
};

// Page: Settings
export default function Settings() {
  const columns = useMemo(
    () => [
      {
        Header: 'Event Title',
        accessor: 'eventTitle',
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'No. of Performances',
        accessor: 'performers',
      },
      {
        Header: 'Judges',
        accessor: 'judges',
        // eslint-disable-next-line react/display-name
        Cell: ({ cell: { value } }) => <Judges values={value} />,
      },
    ],
    []
  );

  return (
    <Layout>
      <div>
        <span>Settings</span>
        <Styles>
          <Table columns={columns} data={events} />
        </Styles>
      </div>
    </Layout>
  );
}
