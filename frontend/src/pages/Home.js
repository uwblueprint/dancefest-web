import React, { useMemo, useState, useEffect } from 'react'; // React
import Layout from 'components/Layout'; // Layout wrapper
import Table from 'components/Table';
import styled from 'styled-components';
import movieData from 'data/mockAPI';
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

const genreStyles = {
  backgroundColor: '#9ae6b4',
  color: '#22543d',
  marginRight: '4px',
  padding: '4px 8px',
  borderRadius: '12px',
  fontSize: '12px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
};

const avatarStyles = {
  textAlign: 'center',
  fontWeight: 400,
  color: 'white',
  backgroundColor: '#42526e',
};

// Custom component to render Genres
const Genres = ({ values }) => {
  // Loop through the array and create a badge-like component instead of a comma-separated string
  return (
    <>
      {values.map((genre, idx) => {
        return (
          <span key={idx} style={genreStyles}>
            {genre}
          </span>
        );
      })}
    </>
  );
};
Genres.displayName = 'Genres';

// Custom component to render Genres
const RunTime = ({ value }) => {
  // Loop through the array and create a badge-like component instead of a comma-separated string
  return (
    <>
      <Avatar name={value} size="medium">
        {props => (
          <span {...props} style={avatarStyles}>
            {value}
          </span>
        )}
      </Avatar>
      {/* {values.map((runTime, idx) => {
        return (
          <Avatar key={idx} name={runTime} size="medium">
            {props => (
              <span {...props} style={avatarStyles}>
                {runTime}
              </span>
            )}
          </Avatar>
        );
      })} */}
    </>
  );
};

// Page: Home
export default function Home() {
  // Parent data for Table

  const columns = useMemo(
    () => [
      {
        // first group - TV Show
        Header: 'TV Show',
        // First group columns
        columns: [
          {
            Header: 'Name',
            accessor: 'show.name',
          },
          {
            Header: 'Type',
            accessor: 'show.type',
          },
        ],
      },
      {
        // Second group - Details
        Header: 'Details',
        // Second group columns
        columns: [
          {
            Header: 'Language',
            accessor: 'show.language',
          },
          {
            Header: 'Genre(s)',
            accessor: 'show.genres',
            // eslint-disable-next-line react/display-name
            Cell: ({ cell: { value } }) => <Genres values={value} />,
          },
          {
            Header: 'Runtime',
            accessor: 'show.runtime',
            // eslint-disable-next-line react/display-name
            Cell: ({ cell: { value } }) => <RunTime value={value} />,
          },
          {
            Header: 'Status',
            accessor: 'show.status',
          },
        ],
      },
    ],
    []
  );

  return (
    <Layout>
      <div>
        <span>Home</span>
        <Styles>
          <Table columns={columns} data={movieData} />
        </Styles>
      </div>
    </Layout>
  );
}
