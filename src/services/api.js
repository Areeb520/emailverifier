import axios from 'axios';

const api = axios.create({
  baseURL: '/v1',
  timeout: 15000,
});

export const verifyEmail = async (email) => {
  try {
    const response = await api.get(`/${email}/verification`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Failed to verify email';
  }
};