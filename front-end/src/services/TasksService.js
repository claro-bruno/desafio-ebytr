import RootService from './RootService';
import endPoints from '../utils/endPoints';

class TasksService extends RootService {
  constructor() {
    super(endPoints.tasks);
  }

  async getAll(userId, token) {
    const config = {
      headers: {
        Authorization: token,
      },
    };
    return this.getResponse(() => this.http.get(`/user/${userId}`, config));
  }

  async register({ title, description, status = 'pendente' }, token) {
    // alterar role futuramente;
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const request = () => this.http.post('/', { title, description, status }, config);
    return this.getResponse(request);
  }

  async remove(item, token) {
    // alterar role futuramente;
    const config = {
      headers: {
        Authorization: token,
      },
    };

    const { _id: id } = item;
    const request = () => this.http.delete(`/${id}`, config);
    return this.getResponse(request);
  }

  async update(item, status, token) {
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const { _id: id, title, description } = item;
    const request = () => this.http.put(`/${id}`, { status, title, description }, config);
    return this.getResponse(request);
  }
}

export default TasksService;
