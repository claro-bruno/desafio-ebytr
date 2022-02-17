import endPoints from '../utils/endPoints';
import RootService from './RootService';

class AuthService extends RootService {
  constructor() {
    super(endPoints.users);
  }

  async login({ email, password }) {
    const request = () => this.http.post('/login', { email, password });
    return this.getResponse(request);
  }

  async register({ name, email, password, role = 'customer' }) {
    // alterar role futuramente;
    const request = () => this.http.post('/', { name, email, password, role });
    return this.getResponse(request);
  }

  async loginWithToken(token) {
    const request = () => this.http.get('/login', {
      headers: {
        Authorization: token,
      },
    });
    return this.getResponse(request);
  }
}

export default AuthService;
