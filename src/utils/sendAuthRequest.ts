import axios from 'axios';

import UserModel from '@/types/UserModel';
import { TEN_MINUTES } from '@/constants';
import useAuthState from '@/composables/useAuthState';

export default async function sendAuthRequest(
  endpoint: string,
  data?: UserModel
) {
  try {
    const { setState, saveState } = useAuthState();

    const res = await axios.post(endpoint, data);
    const accessToken = res.headers.authorization;
    const userId = res.data.userId;
    const nextRefreshTimestamp = (Date.now() + TEN_MINUTES).toString();
    const refreshTimeoutId = setTimeout(
      sendAuthRequest,
      TEN_MINUTES,
      '/auth/refresh'
    ).toString();

    await setState({
      accessToken,
      userId,
      nextRefreshTimestamp,
      refreshTimeoutId
    });
    await saveState();
  } catch (error) {
    return Promise.reject(error);
  }
}
