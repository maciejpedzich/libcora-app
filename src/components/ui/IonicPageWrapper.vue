<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <slot></slot>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonContent
} from '@ionic/vue';

export default {
  name: 'IonicPageWrapper',
  props: ['title'],
  components: {
    IonPage,
    IonButtons,
    IonHeader,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    IonContent
  }
};
</script>
