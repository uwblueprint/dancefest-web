import humps from 'humps';
import { get, post } from './ApiUtils';

export const getAdjudications = (id) => {
  return get(`performances/${id}/adjudications`)
  .then((response) => humps.camelizeKeys(response));
};

export const updateAdjudications = (id, data) => {
  return post(`adjudications/${id}`, humps.decamelizeKeys(data))
  .then((response) => humps.camelizeKeys(response));
};

export const getAdjudicationsByPerformanceId = (ids) => {
  return get(`performances/${ids.join(',')}/adjudications`)
    .then((response) => humps.camelizeKeys(response));
};

export const createAdjudication = (data) => {
  return post('adjudications/', humps.decamelizeKeys(data))
    .then((response) => humps.camelizeKeys(response));
};