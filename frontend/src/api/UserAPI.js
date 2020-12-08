import humps from 'humps';
import { get } from './ApiUtils';

export const getUserByUID = uid => {
  return get(`user/${uid}`)
    .then((response) => humps.camelizeKeys(response));
};
