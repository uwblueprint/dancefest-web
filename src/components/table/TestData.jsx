import React from 'react';
// import Moment from 'react-moment';
import Button from './EditButton';

let id = 0;
function createData(eventName, eventDate, numberOfPerformances,
  numberOfScoreSheets, judges, jsxButton) {
  id += 1;
  return {
    id, eventName, eventDate, numberOfPerformances, numberOfScoreSheets, judges, jsxButton
  };
}

const myDate = new Date();

const testData = [];

for (let i = 0; i < 5; i += 1) {
  const name = `Test ${i}`;
  // const date = () => (
  //   <Moment add={{ days: i }}>
  //     {myDate}
  //   </Moment>);
  testData.push(createData(name, myDate.toLocaleDateString(), 15 + i, 16 + i, 'YYZ', <Button />));
}

export default testData;
