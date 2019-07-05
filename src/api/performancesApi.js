import { get } from './ApiUtils';

export const getPerformances = (id) => {
	return get(`events/${id}/performances`);
}