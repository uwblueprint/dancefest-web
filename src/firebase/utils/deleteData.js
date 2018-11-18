import db from './firebase';

const deleteData = ({ collectionName, docName, data }) => {
  db.collection(collectionName).doc(docName).set(data)
    .then(() => {
      console.log('Document successfully written!');
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
};

export default deleteData;
