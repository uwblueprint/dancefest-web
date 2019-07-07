import humps from 'humps';
import { post } from './ApiUtils';

export const updateEvent = (eventId, data) => {
	return post(`/${eventId}`, humps.decamelizeKeys(data));
};