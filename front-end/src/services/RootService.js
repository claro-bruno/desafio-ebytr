import axios from 'axios';
import { getAxiosResponse } from '../helpers';

class RootService {
  constructor(url) {
    this.http = axios.create({
      baseURL: url,
      timeout: 10000,
    });

    this.getResponse = getAxiosResponse;
  }
}

export default RootService;
