import firebaseApp from './firebase';

const database = firebaseApp.database();

const db = database.ref('samTest4');

const createEvent = (item) => {
  try {
    db.push(item);
  } catch (e) {
    console.log(e);
  }
};

const retrieveEventData = () => {
  const vals = [];
  db.once('value', (snapshot) => {
    snapshot.forEach((data) => {
      const value = {
        eventName: data.val().eventName,
        eventDate: data.val().eventDate,
        danceEntries: data.val().danceEntries
      };
      vals.push(value);
    });
  });
  console.log(vals);
};

export {
  database,
  createEvent,
  retrieveEventData
};
