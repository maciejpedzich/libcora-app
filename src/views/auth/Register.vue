<template>
  <IonicPageWrapper title="Register">
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
    <ion-button
      v-if="imageDataUrl.length === 0"
      class="ion-margin-vertical"
      fill="outline"
      expand="block"
      @click="takePhoto"
    >
      Take a photo
    </ion-button>
    <div v-else>
      <vue-cropper
        v-if="!imageUploaded"
        ref="cropper"
        :viewMode="3"
        :src="imageDataUrl"
        :aspectRatio="1 / 1"
        :cropBoxResizable="false"
        dragMode="move"
      ></vue-cropper>
      <ion-button
        class="ion-margin-vertical"
        fill="outline"
        expand="block"
        :color="uploadImageBtnColour"
        :disabled="imageUploaded"
        @click="uploadImage"
      >
        {{ uploadImageBtnText }}
      </ion-button>
    </div>
    <ion-button color="tertiary" expand="block" @click="register">
      Create an account
    </ion-button>
  </IonicPageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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

import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

import useRegisterUser from '@/composables/useRegisterUser';
import useObtainLocation from '@/composables/useObtainLocation';
import useTakePhoto from '@/composables/useTakePhoto';

export default defineComponent({
  name: 'AuthRegister',
  components: {
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
    IonButton,
    VueCropper
  },
  setup() {
    const { user, genres, register } = useRegisterUser();

    return {
      user,
      genres,
      register,
      ...useObtainLocation(user),
      ...useTakePhoto(user)
    };
  }
});
</script>
