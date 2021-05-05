<template>
  <Page title="Register">
    <ion-grid class="ion-no-padding">
      <ion-row>
        <ion-col class="ion-margin-end">
          <ion-item>
            <ion-label position="floating">First name</ion-label>
            <ion-input type="text" v-model="user.firstname"></ion-input>
          </ion-item>
        </ion-col>
        <ion-col>
          <ion-item>
            <ion-label position="floating">Last name</ion-label>
            <ion-input type="text" v-model="user.lastname"></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>
    </ion-grid>
    <ion-item class="ion-margin-vertical">
      <ion-label position="floating">Email address</ion-label>
      <ion-input type="email" v-model="user.email"></ion-input>
    </ion-item>
    <ion-item class="ion-margin-vertical">
      <ion-label position="floating">Password</ion-label>
      <ion-input type="password" v-model="user.password"></ion-input>
    </ion-item>
    <ion-item class="ion-margin-vertical">
      <ion-label position="floating">Date of birth</ion-label>
      <ion-datetime
        display-format="MMMM D YYYY"
        v-model="user.dob"
      ></ion-datetime>
    </ion-item>
    <ion-item class="ion-margin-vertical">
      <ion-label position="floating">Bio</ion-label>
      <ion-textarea v-model="user.bio"></ion-textarea>
    </ion-item>
    <ion-item class="ion-margin-vertical">
      <ion-label>Favourite genres</ion-label>
      <ion-select multiple="true" ok-text="Done" v-model="user.favouriteGenres">
        <ion-select-option v-for="genre of genres" :key="genre" :value="genre">
          {{ genre }}
        </ion-select-option>
      </ion-select>
    </ion-item>
    <ion-button
      class="ion-margin-vertical"
      fill="outline"
      expand="block"
      :color="locationBtnColour"
      :disabled="locationObtained"
      @click="obtainLocation"
    >
      {{ locationBtnText }}
    </ion-button>
    <ion-button color="tertiary" @click="register">
      Create account
    </ion-button>
  </Page>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonInput,
  IonTextarea,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonButton
} from '@ionic/vue';

import Page from '@/components/ui/Page.vue';
import { BOOK_GENRES } from '@/constants';
import UserModel from '@/types/UserModel';
import useObtainLocation from '@/composables/useObtainLocation';

import sendAuthRequest from '@/utils/sendAuthRequest';
import determineErrorMessage from '@/utils/determineErrorMessage';
import displayToastUtil from '@/utils/displayToast';

export default defineComponent({
  name: 'AuthRegister',
  components: {
    Page,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonInput,
    IonTextarea,
    IonDatetime,
    IonSelect,
    IonSelectOption,
    IonLabel,
    IonButton
  },
  setup() {
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

    const {
      locationObtained,
      locationBtnColour,
      locationBtnText,
      obtainLocation
    } = useObtainLocation(user);

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
      obtainLocation,
      locationObtained,
      locationBtnColour,
      locationBtnText,
      register
    };
  }
});
</script>
