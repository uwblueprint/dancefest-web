import humps from 'humps';
import { get, post } from './ApiUtils';

export const getAwardPerformances = (awardId) => {
	return get(`/performances/${awardId}/awards`);
};

export const getAwardPerformanceComments = (performanceId, awardId) => {
	return get(`/performances/${performanceId}/adjudications/${awardId}/comments`);
}

export const createAward = (data) => {
	return post(`awards/`, humps.decamelizeKeys(data))
	.then((response) => humps.camelizeKeys(response));
}
