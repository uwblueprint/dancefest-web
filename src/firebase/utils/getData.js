import db from '../firebase';

const getData = async (collectionName, data) => {
  db.collection(collectionName).get(data)
    .then(() => console.log('Document successfully added!'))
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
};

export default getData;