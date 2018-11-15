// import firebaseApp from './firebase';
//
// const database = firebaseApp.database().ref('samTest4');
//
// const createEvent = (item) => {
//   try {
//     database.push(item);
//   } catch (e) {
//     console.log(e);
//   }
// };
//
// const retrieveEventData = () => {
//   const vals = [];
//   database.once('value', (snapshot) => {
//     snapshot.forEach((data) => {
//       const value = {
//         eventName: data.val().eventName,
//         eventDate: data.val().eventDate,
//         danceEntries: data.val().danceEntries
//       };
//       vals.push(value);
//     });
//   });
//   console.log(vals);
// };
//
// export {
//   createEvent,
//   retrieveEventData
// };
