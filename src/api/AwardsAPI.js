import humps from 'humps';
import { get } from './ApiUtils';

export const getAwards = (eventId) => {
    return get(`awards/${eventId}`)
    .then((data) => humps.camelizeKeys(data));
};