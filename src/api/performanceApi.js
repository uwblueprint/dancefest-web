import humps from 'humps';
import { post } from './ApiUtils';

export const createPerformance = (data) => {
  return post('performances/', humps.decamelizeKeys(data));
};

export const updatePerformance = (performanceId, data) => {
  return post(`performances/${performanceId}`, humps.decamelizeKeys(data));
};
