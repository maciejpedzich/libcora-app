import { AxiosError } from 'axios';
import { UNEXPECTED_ERR_MSG } from '@/constants';

export default function determineErrorMessage(error: Error) {
  const errRes = (error as AxiosError).response;
  const message =
    errRes && errRes.status !== 500 ? errRes.data.error : UNEXPECTED_ERR_MSG;

  return message;
}
