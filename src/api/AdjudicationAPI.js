import { get } from './ApiUtils';
import { getAdjudicationsURL } from './PathConstants';

export const getAdjudications = (id) => {
    return get(getAdjudicationsURL(id));
};