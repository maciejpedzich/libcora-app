<template>
  <IonicPageWrapper title="Your contacts">
    <ion-list>
      <div v-if="isLoading">
        <SkeletonListItem v-for="n in 3" :key="n" />
      </div>
      <p v-else-if="contacts.length === 0" class="ion-padding-start">
        You don't have any contacts, because no users have mutually matched with
        you yet.
      </p>
      <div v-else>
        <UserListItem
          v-for="user in contacts"
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

import { IonList } from '@ionic/vue';
import SkeletonListItem from '@/components/SkeletonListItem.vue';
import UserListItem from '@/components/UserListItem.vue';

import UserModel from '@/types/UserModel';
import determineErrorMessage from '@/utils/determineErrorMessage';
import displayToastUtil from '@/utils/displayToast';

export default defineComponent({
  name: 'Contacts',
  components: {
    IonList,
    SkeletonListItem,
    UserListItem
  },
  setup() {
    const isLoading = ref<boolean>(true);
    const contacts = ref<UserModel[]>([]);

    onMounted(async () => {
      try {
        const { data } = await axios.get<UserModel[]>('/users/mutual-matches');

        contacts.value.push(...data);
        isLoading.value = false;
      } catch (error) {
        displayToastUtil('danger', determineErrorMessage(error));
      }
    });

    return { isLoading, contacts };
  }
});
</script>
