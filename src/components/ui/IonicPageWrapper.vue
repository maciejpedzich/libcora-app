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
    <ion-content>
      <slot class="ion-padding"></slot>
      <div slot="fixed" id="fixed">
        <slot name="fixed"></slot>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import {
  IonPage,
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonContent
} from '@ionic/vue';

export default defineComponent({
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
});
</script>

<style scoped>
#fixed {
  width: 100%;
  bottom: 0;
}
</style>
