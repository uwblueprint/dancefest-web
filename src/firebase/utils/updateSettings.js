import db, { firebaseField } from '../firebase';
import constants from '../../constants';

const updateSettings = async (category, value, type = constants.ADD_DATA) => {
  const handleUpdate = type === constants.ADD_DATA ? value : firebaseField.delete();
  db.collection('settings').doc(category).set({
    [value]: handleUpdate
  }, { merge: true })
    .then(() => {
      console.log('Document successfully!');
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
      return false;
    });
};

export default updateSettings;
