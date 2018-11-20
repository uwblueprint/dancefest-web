import db from '../firebase';

const addData = (collectionName, data, onSuccess) => {
  db.collection(collectionName).add(data)
    .then((docRef) => {
      console.log('Document successfully added!');
      if (onSuccess) {
        onSuccess();
      }
      return docRef.id;
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
      return false;
    });
};

export default addData;
