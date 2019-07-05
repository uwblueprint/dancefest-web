import { get } from './ApiUtils';

export const getAdjudications = (id) => {
    return get(`performances/${id}/adjudications`);
};