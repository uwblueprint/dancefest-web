import db from '../firebase';

const addData = (collectionName, data) => {
  db.collection(collectionName).add(data)
    .then((docRef) => {
      console.log('Document successfully added!');
      return docRef.id;
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
      return false;
    });
};

export default addData;
