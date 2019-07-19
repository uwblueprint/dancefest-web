import db from '../firebase';
import { awardConsiderationEnum } from '../../constants';

const getIndex = (action, performanceDocDataEnum) => {
  const { DECREMENT } = awardConsiderationEnum;
  let idx;
  if (action === DECREMENT) {
    idx = performanceDocDataEnum ? -1 : 0;
  } else {
    idx = 1;
  }
  const currEnum = performanceDocDataEnum || 0;
  return currEnum + idx;
};

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
  /* example of collectionName:
   *    "events/8cIC1iEVYUCDzokoNkfe/performances/EKE7Vxpaa5elH1n97ALp/adjudication"
   * example of performanceCollection:
   *    "events/8cIC1iEVYUCDzokoNkfe/performances"
   */
  const performanceCollection = collectionName.match(/events\/\w{20}\/performances/)[0];
  // length of characters in performanceCollection string can help us determine
  // the index at which performanceDocName i.e. "EKE7Vxpaa5elH1n97ALp" is
  const { length } = performanceCollection;
  const performanceDocName = collectionName.substring(length + 1, length + 21);

  const ajudicationRef = db.collection(collectionName).doc(docName);
  const performanceRef = db.collection(performanceCollection).doc(performanceDocName);

  const { NO_CHANGE } = awardConsiderationEnum;

  db.runTransaction(transaction => transaction
    .get(performanceRef)
    .then((performanceDoc) => {
      const awardData = {};

      if (choreoAwardAction !== NO_CHANGE) {
        awardData.choreoAwardEnum = getIndex(choreoAwardAction,
          performanceDoc.data().choreoAwardEnum);
      }

      if (specialAwardAction !== NO_CHANGE) {
        awardData.specialAwardEnum = getIndex(specialAwardAction,
          performanceDoc.data().specialAwardEnum);
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
