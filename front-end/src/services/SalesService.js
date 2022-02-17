import RootService from './RootService';
import endPoints from '../utils/endPoints';

class SalesService extends RootService {
  constructor() {
    super(endPoints.sales);
  }

  async getAll() {
    return this.getResponse(() => this.http.get('/'));
  }

  async getAllBySeller(userId) {
    return this.getResponse(() => this.http.get(`/seller/${userId}`));
  }

  async getAllByCustomer(userId) {
    return this.getResponse(() => this.http.get(`/customer/${userId}`));
  }

  async getSale(id) {
    return this.getResponse(() => this.http.get(`/${id}`));
  }

  async saveSale(sale, user) {
    const { token } = user;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    return this.getResponse(() => (
      this.http.post('/', sale, config)
    ));
  }

  async updateStatus({ id, status }, user) {
    const { token } = user;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    return this.getResponse(() => (
      this.http.put(`/status/${id}`, { status }, config)
    ));
  }
}

export default SalesService;
