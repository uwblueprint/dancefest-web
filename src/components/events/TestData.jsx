let id = 0;
function createData(name, date, numDancers, numPerformances, numJudges) {
  id += 1;
  return {
    id, name, date, numDancers, numPerformances, numJudges
  };
}

const myDate = new Date();

const Testdata = [];

for (let i = 0; i < 5; i += 1) {
  const name = `Test ${i}`;
  Testdata.push(createData(name, myDate.toLocaleDateString(), 20 + i, 15 + i, 16 + i));
}

export default Testdata;
