import { AxiosError } from 'axios';

export default function determineErrorMessage(error: Error) {
  const errRes = (error as AxiosError).response;
  const message =
    errRes && errRes.status !== 500
      ? errRes.data.error
      : 'Unexpected error occurred';

  return message;
}
