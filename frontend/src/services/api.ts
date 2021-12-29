import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? `${process.env.REACT_APP_API_URL}/api` : `/api`,
});
