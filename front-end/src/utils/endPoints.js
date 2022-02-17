const { REACT_APP_BASE_URL = 'http://localhost:3001' } = process.env;

export default {
  users: `${REACT_APP_BASE_URL}/users`,
  tasks: `${REACT_APP_BASE_URL}/tasks`,
};
