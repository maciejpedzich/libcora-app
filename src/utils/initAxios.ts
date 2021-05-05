import { Storage } from '@capacitor/core';
import axios from 'axios';

export default function initAxios() {
  axios.defaults.baseURL = process.env.VUE_APP_API_URL;
  axios.defaults.withCredentials = true;

  axios.interceptors.request.use(
    async (config) => {
      const accessToken = await Storage.get({ key: 'accessToken' });

      config.headers.common['Authorization'] = accessToken.value
        ? `Bearer ${accessToken.value}`
        : null;

      return config;
    },
    (error) => Promise.reject(error)
  );
}
