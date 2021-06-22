<template>
  <IonicPageWrapper title="Your matches">
    <ion-list>
      <ion-list-header>
        <h3>Favourtied users</h3>
      </ion-list-header>
      <div v-if="isLoading">
        <SkeletonListItem v-for="n in 3" :key="n" />
      </div>
      <p v-else-if="favourited.length === 0" class="ion-padding-start">
        You haven't favourited any users yet.
      </p>
      <div v-else>
        <UserListItem
          v-for="user in favourited"
          :key="user.id"
          :avatar-url="user.avatarUrl"
          :firstname="user.firstname"
          :lastname="user.lastname"
        />
      </div>
    </ion-list>
    <ion-list>
      <ion-list-header>
        <h3>Ignored users</h3>
      </ion-list-header>
      <div v-if="isLoading">
        <SkeletonListItem v-for="n in 3" :key="n" />
      </div>
      <p v-else-if="ignored.length === 0" class="ion-padding-start">
        You haven't ignored any users yet.
      </p>
      <div v-else>
        <UserListItem
          v-for="user in ignored"
          :key="user.id"
          :avatar-url="user.avatarUrl"
          :firstname="user.firstname"
          :lastname="user.lastname"
        />
      </div>
    </ion-list>
  </IonicPageWrapper>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import axios from 'axios';

import { IonList, IonListHeader } from '@ionic/vue';

import displayToastUtil from '@/utils/displayToast';
import determineErrorMessage from '@/utils/determineErrorMessage';
import UserModel from '@/types/UserModel';

import SkeletonListItem from '@/components/SkeletonListItem.vue';
import UserListItem from '@/components/UserListItem.vue';

export default defineComponent({
  name: 'UserMatches',
  components: {
    IonList,
    IonListHeader,
    SkeletonListItem,
    UserListItem
  },
  setup() {
    const isLoading = ref<boolean>(true);
    const favourited = ref<UserModel[]>([]);
    const ignored = ref<UserModel[]>([]);

    onMounted(async () => {
      try {
        const { data } = await axios.get<{
          favouritedUsers: UserModel[];
          ignoredUsers: UserModel[];
        }>('/users/matches');
        const { favouritedUsers, ignoredUsers } = data;

        favourited.value.push(...favouritedUsers);
        ignored.value.push(...ignoredUsers);
        isLoading.value = false;
      } catch (error) {
        displayToastUtil('danger', determineErrorMessage(error));
      }
    });

    return { isLoading, favourited, ignored };
  }
});
</script>
