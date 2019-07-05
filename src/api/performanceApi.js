import humps from 'humps';
import { post } from './ApiUtils';

export const createPerformance = (collectionName, data) => {
  return post('performances/', humps.decamelizeKeys(data));
};