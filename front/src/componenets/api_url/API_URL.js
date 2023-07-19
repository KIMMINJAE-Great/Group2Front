import axios from 'axios';

const API_URL = 'http://localhost:8080';

export function get(path) {
  return axios.get(`${API_URL}${path}`);
}

export function post(path, data) {
  return axios.post(`${API_URL}${path}`, data);
}