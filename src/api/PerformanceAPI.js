import humps from 'humps';
import { get, post } from './ApiUtils';

export const getPerformances = (id) => {
	return get(`events/${id}/performances`);
};

export const createPerformance = (data) => {
  return post('performances/', humps.decamelizeKeys(data))
    .then((response) => humps.camelizeKeys(response));
};

export const updatePerformance = (performanceId, data) => {
  return post(`performances/${performanceId}`, humps.decamelizeKeys(data))
    .then((response) => humps.camelizeKeys(response));
};
