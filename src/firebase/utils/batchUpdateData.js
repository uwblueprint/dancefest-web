import db from '../firebase';
import { awardConsiderationEnum } from '../../constants';

/*
* This batchUpdateData method is written explicitly for handling
* a batch transaction of updating performance and adjudications collection.
* This can be refactored to handled batch updates and transactions if needed.
*/
const batchUpdateData = async (
  collectionName,
  docName,
  data,
  choreoAwardAction,
  specialAwardAction,
) => {
  const performanceCollection = collectionName.match(/events\/\w{20}\/performances/)[0];
  const { length } = performanceCollection;
  const performanceDocName = collectionName.substring(length + 1, length + 21);

  const ajudicationRef = db.collection(collectionName).doc(docName);
  const performanceRef = db.collection(performanceCollection).doc(performanceDocName);

  db.runTransaction(transaction => transaction.get(performanceRef).then((performanceDoc) => {
    const awardData = {};

    if (choreoAwardAction !== awardConsiderationEnum.NO_CHANGE) {
      let idx;
      if (choreoAwardAction === awardConsiderationEnum.DECREMENT) {
        idx = performanceDoc.data().choreoAwardEnum ? -1 : 0;
      } else {
        idx = 1;
      }
      const choreoAwardEnum = performanceDoc.data().choreoAwardEnum || 0;
      awardData.choreoAwardEnum = choreoAwardEnum + idx;
    }

    if (specialAwardAction !== awardConsiderationEnum.NO_CHANGE) {
      let idx;
      if (specialAwardAction === awardConsiderationEnum.DECREMENT) {
        idx = performanceDoc.data().specialAwardEnum ? -1 : 0;
      } else {
        idx = 1;
      }
      const specialAwardEnum = performanceDoc.data().specialAwardEnum || 0;
      awardData.specialAwardEnum = specialAwardEnum + idx;
    }

    transaction.update(performanceRef, awardData);
    transaction.set(ajudicationRef, data, { merge: true });
  })).then(() => console.log('Batch Document successfully written!'))
    .catch((error) => {
      console.error('Error writing document: ', error);
      return false;
    });
};

export default batchUpdateData;
