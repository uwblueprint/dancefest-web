const events = [
  {
    ID: 1,
    title: 'Somebody To',
    school: 'Bluevale Collegiate Institute',
    competition_level: 'Advanced',
    dance_style: 'Jazz',
    dance_size: 'Medium Group',
    score: '95',
  },
  {
    ID: 2,
    title: 'Somebody To Love 2',
    school: 'Bluevale Collegiate Institute',
    competition_level: 'Advanced',
    dance_style: 'Ballet',
    dance_size: 'Medium Group',
    score: '95',
  },
  {
    ID: 3,
    title: 'Somebody To Love 3',
    school: 'Bluevale Collegiate Institute',
    competition_level: 'Advanced',
    dance_style: 'Jazz',
    dance_size: 'Medium Group',
    score: '95',
  },
  {
    ID: 4,
    title: 'Somebody To Loveeeeeeeeeee',
    school: 'Bluevale Collegiate Institute',
    competition_level: 'Advanced',
    dance_style: 'Jazz',
    dance_size: 'Medium Group',
    score: '95',
  },
  {
    ID: 5,
    title: 'Somebody To Loveasdfasdf',
    school: 'Bluevale Collegiate Institute',
    competition_level: 'Easy',
    dance_style: 'Hip Hop',
    dance_size: 'Medium Group',
    score: '95',
  },
  {
    ID: 6,
    title: 'Somebody To Loveasdf as as ',
    school: 'Cardinal Carter Catholic Secondary School',
    competition_level: 'Advanced',
    dance_style: 'Jazz',
    dance_size: 'Medium Group',
    score: '95',
  },
  {
    ID: 7,
    title: 'Somebody To Love 45 2 1',
    school: 'Bluevale Collegiate Institute',
    competition_level: 'Intermediate',
    dance_style: 'Tap',
    dance_size: 'Creative Collaboration',
    score: '95',
  },
  {
    ID: 8,
    title: 'Somebody To Love %@#$',
    school: 'Bluevale Collegiate Institute',
    competition_level: 'Intermediate',
    dance_style: 'Jazz',
    dance_size: 'Medium Group',
    score: '95',
  },
  {
    ID: 9,
    title: 'Somebody To Love 098234',
    school: 'Bluevale Collegiate Institute',
    competition_level: 'Intermediate',
    dance_style: 'Tap',
    dance_size: 'Medium Group',
    score: '95',
  },
];

export const columns = [
  {
    Header: 'ID',
    accessor: 'ID',
  },
  {
    Header: 'Title',
    accessor: 'title',
    // filter: 'equals',
  },
  {
    Header: 'School',
    accessor: 'school',
  },
  {
    Header: 'Level',
    accessor: 'competition_level',
  },
  {
    Header: 'Style',
    accessor: 'dance_style',
  },
  {
    Header: 'Size',
    accessor: 'dance_size',
  },
  {
    Header: 'Score',
    accessor: 'score',
  },
];

export default events;
