import button from './editButton';

let id = 0;
function createData(eventName, eventDate, numberOfPerformances,
  numberOfScoreSheets, judges, jsxButton) {
  id += 1;
  return {
    id, eventName, eventDate, numberOfPerformances, numberOfScoreSheets, judges, jsxButton
  };
}

const myDate = new Date();

const testData = [
  createData('Test1', myDate.setDate(myDate.getDate + 1), 15, 16, 'YYZ', button),
  createData('Test2', myDate.setDate(myDate.getDate + 2), 16, 17, 'YYZ', button),
  createData('Test3', myDate.setDate(myDate.getDate + 3), 17, 18, 'YYZ', button),
  createData('Test4', myDate.setDate(myDate.getDate + 4), 18, 19, 'YYZ', button),
  createData('Test5', myDate.setDate(myDate.getDate + 5), 19, 20, 'YYZ', button)
];

export default testData;
