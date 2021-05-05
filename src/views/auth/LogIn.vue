<template>
  <Page title="Log in">
    <ion-item class="ion-margin-vertical">
      <ion-label position="floating">Email address</ion-label>
      <ion-input type="email" v-model="user.email"></ion-input>
    </ion-item>
    <ion-item class="ion-margin-vertical">
      <ion-label position="floating">Password</ion-label>
      <ion-input type="password" v-model="user.password"></ion-input>
    </ion-item>
    <ion-button color="tertiary" expand="block" @click="logIn">
      Log in
    </ion-button>
  </Page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';

import { IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';

import Page from '@/components/ui/Page.vue';
import UserModel from '@/types/UserModel';

import sendAuthRequest from '@/utils/sendAuthRequest';
import determineErrorMessage from '@/utils/determineErrorMessage';
import displayToastUtil from '@/utils/displayToast';

export default defineComponent({
  name: 'AuthLogIn',
  components: {
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    Page
  },
  setup() {
    const router = useRouter();

    const user = reactive<UserModel>({
      email: '',
      password: ''
    });

    const logIn = async () => {
      try {
        await sendAuthRequest('/auth/log-in', user);

        displayToastUtil('success', 'Welcome back!');
        router.push('/');
      } catch (error) {
        displayToastUtil('danger', determineErrorMessage(error));
      }
    };

    return { user, logIn };
  }
});
</script>
