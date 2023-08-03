import axios from 'axios';

const API_URL = 'http://localhost:8080';

export async function get(path) {
  try {
    const response = await axios.get(`${API_URL}${path}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getByQueryString(path) {
  try {
    const response = await axios.get(`${API_URL}${path}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export async function post(path, data) {
  try {
    const response = await axios.post(`${API_URL}${path}`, data);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function del(path, data) {
  try {
    const response = await axios.delete(`${API_URL}${path}`, data)
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }



}

export async function update(path, data) {
  try {
    const response = await axios.put(`${API_URL}${path}`, data)
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }



}