const awards = [
  {
    ID: 1,
    title: 'Sharp Movements',
    competition_level: 'Advanced',
    type: 'Special Award',
    nominations: '2',
  },
  {
    ID: 2,
    title: 'Most Inspiring Medium Group Performance',
    competition_level: 'Advanced',
    type: 'Dance Artistry',
    nominations: '8',
  },
  {
    ID: 3,
    title: 'Most Inspiring Large Group Performance',
    competition_level: 'Advanced',
    type: 'Dance Artistry',
    nominations: '3',
  },
  {
    ID: 4,
    title: 'Most Inspiring Medium Group Performance',
    competition_level: 'Advanced',
    type: 'Dance Artistry',
    nominations: '1',
  },
  {
    ID: 5,
    title: 'Sharp Movements',
    competition_level: 'Advanced',
    type: 'Special Award',
    nominations: '5',
  },
  {
    ID: 6,
    title: 'Most Outstanding Choreography Novice Duet/Trio',
    competition_level: 'Advanced',
    type: 'Dance Artistry',
    nominations: '2',
  },
  {
    ID: 7,
    title: 'Best Costume',
    competition_level: 'Advanced',
    type: 'Special Award',
    nominations: '3',
  },
  {
    ID: 8,
    title: 'Sharp Movements',
    competition_level: 'Advanced',
    type: 'Special Award',
    nominations: '2',
  },
  {
    ID: 9,
    title: 'Sharp Movements 6',
    competition_level: 'Advanced',
    type: 'Special Award',
    nominations: '1',
  },
  {
    ID: 10,
    title: 'Sharp Movements 3',
    competition_level: 'Advanced',
    type: 'Special Award',
    nominations: '2',
  },
  {
    ID: 11,
    title: 'Sharp Movements 4',
    competition_level: 'Advanced',
    type: 'Score Based',
    nominations: '2',
  },
];

export const columns = [
  {
    Header: 'Edit',
    accessor: 'edit',
    // eslint-disable-next-line react/display-name
    // Cell: () => (
    //   <div className={styles.entryTable__editCell}>
    //     <Button variant="edit" />
    //   </div>
    // ),
  },
  {
    Header: 'Award Title',
    accessor: 'title',
  },
  {
    Header: 'Type',
    accessor: 'type',
  },
  {
    Header: 'No. of nominations',
    accessor: 'nominations',
    filter: 'matchEnum',
  },
];

export default awards;
