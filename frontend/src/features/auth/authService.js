import axios from 'axios';

// Register user
const register = async (userData) => {
  const response = await axios.post('/api/users/', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  register,
};

export default authService;
