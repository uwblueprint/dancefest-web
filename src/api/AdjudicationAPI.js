import humps from 'humps';
import { get, post } from './ApiUtils';

export const getAdjudications = (id) => {
  return get(`performances/${id}/adjudications`);
};

export const updateAdjudications = (id, data) => {
  return post(`adjudications/${id}`, humps.decamelizeKeys(data));
};