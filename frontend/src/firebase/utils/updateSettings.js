import db, { firebaseField } from '../firebase';
import { dataAction } from '../../constants';

const updateSettings = async (category, value, type = dataAction.ADD_DATA) => {
  const handleUpdate = type === dataAction.ADD_DATA ? value : firebaseField.delete();
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
