function createData(id,
  entry,
  title,
  school,
  academicLevel,
  competitionLevel,
  danceStyle,
  danceSize) {
  return {
    id,
    entry,
    title,
    school,
    academicLevel,
    competitionLevel,
    danceStyle,
    danceSize
  };
}


const Testdata = [];

for (let i = 0; i < 5; i += 1) {
  const name = `Test ${i}`;
  Testdata.push(createData(1 + i, name, name, name, name, name, 20 + i, 15 + i));
}

export default Testdata;
