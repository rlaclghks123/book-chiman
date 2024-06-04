import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3005';

export const api = axios.create({
  baseURL: BASE_URL,
});
