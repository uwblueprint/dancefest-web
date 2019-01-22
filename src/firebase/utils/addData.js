import db from '../firebase';

const addData = async (collectionName, data) => {
  console.log('add Data collectionName: ', collectionName);
  console.log('add Data data: ', data);
  db.collection(collectionName).add(data)
    .then(() => console.log('Document successfully added!'))
    .catch((error) => {
      console.error('Error writing document: ', error);
      return false;
    });
};

export default addData;
