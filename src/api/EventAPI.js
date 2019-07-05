import { post } from './ApiUtils';

export const addNewEvent = (body) => {
    return post(`/events/`, body);
};

export const editExistingEvent = (eventId, body) => {
    return post(`/events/${eventId}`, body);
};
