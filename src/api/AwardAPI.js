import { get } from './ApiUtils';

export const getAwardPerformances = (awardId) => {
	return get(`/performances/${awardId}/awards`);
};

export const getAwardPerformanceComments = (performanceId, awardId) => {
	return get(`/performances/${performanceId}/adjudications/${awardId}/comments`);
}