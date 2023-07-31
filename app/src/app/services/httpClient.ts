import axios from 'axios';
import cookie from 'js-cookie';

import { cookieKeys } from '../config/cookieKeys';
import { sleep } from '../utils';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

httpClient.interceptors.request.use(config => {
  const accessToken = cookie.get(cookieKeys.ACCESS_TOKEN);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config;
});

httpClient.interceptors.response.use(async data => {
  await sleep();

  return data;
})
