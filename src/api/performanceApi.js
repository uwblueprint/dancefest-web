import humps from 'humps';
import { post } from './ApiUtils';

const createPerformance = (collectionName, data) => {
  return post('performances/', humps.decamelizeKeys(data));
};

export default createPerformance;
