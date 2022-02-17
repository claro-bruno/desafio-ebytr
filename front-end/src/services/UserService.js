import endPoints from '../utils/endPoints';
import RootService from './RootService';

class UserService extends RootService {
  constructor() {
    super(endPoints.users);
  }

  async getAllSellers() {
    const response = await this.getResponse(() => this.http.get('/'));
    return response.users.filter((user) => user.role === 'seller');
  }
}

export default UserService;
