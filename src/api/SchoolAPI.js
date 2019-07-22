import humps from 'humps';
import { get, post } from './ApiUtils';

export const getPerformancesByToken = (eventId, token) => {
  return get(`school/${eventId}/${token}`)
    .then((response) => humps.camelizeKeys(response));
};

export const generateToken = (data) => {
  return post('school/token', humps.decamelizeKeys(data))
    .then((response) => humps.camelizeKeys(response));
};