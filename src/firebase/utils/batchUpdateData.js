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
  performanceData,
  choreoAwardAction = awardConsiderationEnum.NO_CHANGE,
  specialAwardAction = awardConsiderationEnum.NO_CHANGE,
) => {
  const performanceCollection = collectionName.match(/events\/\w{20}\/performances/)[0];
  const { length } = performanceCollection;
  const performanceDocName = collectionName.substring(length + 1, length + 21);

  const ajudicationRef = db.collection(collectionName).doc(docName);
  const performanceRef = db.collection(performanceCollection).doc(performanceDocName);

  db.runTransaction(transaction => transaction.get(performanceRef).then((performanceDoc) => {
    const awardData = {};

    if (choreoAwardAction !== awardConsiderationEnum.NO_CHANGE) {
      const idx = awardConsiderationEnum.INCREMENT ? 1 : -1;
      awardData.choreoAwardEnum = performanceDoc.data().choreolAwardEnum + idx;
    }

    if (specialAwardAction !== awardConsiderationEnum.NO_CHANGE) {
      const idx = awardConsiderationEnum.INCREMENT ? 1 : -1;
      awardData.specialAwardEnum = performanceDoc.data().specialAwardEnum + idx;
    }

    transaction.set(performanceRef, awardData);
    transaction.set(ajudicationRef, data);
  })).then(() => console.log('Document successfully written!'))
    .catch((error) => {
      console.error('Error writing document: ', error);
      return false;
    });
};

export default batchUpdateData;
