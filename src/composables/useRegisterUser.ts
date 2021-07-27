import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

import UserModel from '@/types/UserModel';
import { BOOK_GENRES } from '@/constants';

import sendAuthRequest from '@/utils/sendAuthRequest';
import determineErrorMessage from '@/utils/determineErrorMessage';
import displayToastUtil from '@/utils/displayToast';

export default function useRegisterUser() {
  const router = useRouter();

  const user = reactive<UserModel>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    dob: '',
    bio: '',
    favouriteGenres: [],
    location: ''
  });
  const genres = ref<string[]>(BOOK_GENRES);

  const register = async () => {
    try {
      await sendAuthRequest('/auth/register', user);
      displayToastUtil('success', `Welcome to Libcora, ${user.firstname}!`);
      router.push('/');
    } catch (error) {
      displayToastUtil('danger', determineErrorMessage(error));
    }
  };

  return {
    user,
    genres,
    register
  };
}
