import { get } from './ApiUtils';

export const getEvents = () => {
    return get(`events`);
};