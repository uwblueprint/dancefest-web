import db from '../firebase';

const updateData = (collectionName, docName, data) => {
  db.collection(collectionName).doc(docName).set(data)
    .then(() => {
      console.log('Document successfully written!');
      return true;
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
      return false;
    });
};

export default updateData;
