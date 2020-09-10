import { get, post } from './ApiUtils';

export const getEvents = () => {
    return get(`events`);
};

export const addNewEvent = (body) => {
    return post(`/events/`, body);
};

export const editExistingEvent = (eventId, body) => {
    return post(`/events/${eventId}`, body);
};
