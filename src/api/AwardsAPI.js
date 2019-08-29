import { get } from './ApiUtils';

export const getAwards = (eventId) => {
    return get(`awards/${eventId}`);
};