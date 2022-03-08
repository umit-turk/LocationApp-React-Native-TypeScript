import axios from 'axios';
import Config from 'react-native-config';

const instance = axios.create({
  baseURL: Config.API_URL,
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
  timeout: 30000,
});

instance.interceptors.request.use(
  config => {
    const token = 'dsadsadsadsa';

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    console.log(error);
  },
);

export default instance;