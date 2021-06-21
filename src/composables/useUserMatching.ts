import { ref, computed, watch } from 'vue';
import { formatDistanceToNowStrict } from 'date-fns';
import axios from 'axios';

import UserModel from '@/types/UserModel';
import determineErrorMessage from '@/utils/determineErrorMessage';
import displayToastUtil from '@/utils/displayToast';

export default function useUserMatching() {
  const isLoading = ref<boolean>(true);
  const users = ref<UserModel[]>([]);

  const firstMatchingUser = computed<UserModel | undefined>(
    () => users.value[0]
  );
  const matchingUserFullname = computed<string>(
    () =>
      `${firstMatchingUser.value?.firstname} ${firstMatchingUser.value?.lastname}`
  );
  const matchingUserAge = computed<string>(() => {
    const numYears = formatDistanceToNowStrict(
      new Date(firstMatchingUser.value?.dob || Date.now()),
      {
        unit: 'year'
      }
    );

    return `${numYears} old`;
  });

  const getMatchingUsers = async () => {
    try {
      isLoading.value = true;

      const { data } = await axios.get<UserModel[]>('/users');
      users.value.push(...data);

      isLoading.value = false;
    } catch (error) {
      displayToastUtil('danger', determineErrorMessage(error));
    }
  };

  const sendMatchRequest = async (action: string) => {
    try {
      await axios.post(`/users/${action}/${firstMatchingUser.value?.id}`);
      users.value.splice(0, 1);
    } catch (error) {
      displayToastUtil('danger', determineErrorMessage(error));
    }
  };

  watch(
    users,
    (newUsersArr) => {
      if (newUsersArr.length === 0) {
        getMatchingUsers();
      }
    },
    { deep: true }
  );

  return {
    isLoading,
    users,
    firstMatchingUser,
    matchingUserFullname,
    matchingUserAge,
    getMatchingUsers,
    sendMatchRequest
  };
}
