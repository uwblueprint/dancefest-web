function createData(judge, audio, cumlScore, awards) {
  return {
    judge, audio, cumlScore, awards
  };
}

const Testdata = [];

for (let i = 0; i < 5; i += 1) {
  const name = `Test ${i}`;
  Testdata.push(createData(name, name, i + 10, i + 20));
}

export default Testdata;
