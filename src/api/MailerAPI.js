import humps from 'humps';
import { post } from './ApiUtils';

export const sendMail = (data) => {
  return post('mailer/', humps.decamelizeKeys(data))
    .then((response) => humps.camelizeKeys(response));
};