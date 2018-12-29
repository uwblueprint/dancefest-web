import db from '../firebase';

const deleteData = (collectionName, docName) => {
  db.collection(collectionName).doc(docName).delete()
    .then(() => {
      console.log('Document successfully deleted!');
    })
    .catch((error) => {
      console.error('Error deleted document: ', error);
    });
};

export default deleteData;
