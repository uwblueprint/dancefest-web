import axios from 'axios';
import humps from 'humps';
import { post } from './ApiUtils';

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const createPerformance = async (collectionName, data) => {
  return post('performances/', humps.decamelizeKeys(data));
};

export default createPerformance;
