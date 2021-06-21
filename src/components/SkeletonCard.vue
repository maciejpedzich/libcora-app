<template>
  <ion-card>
    <ion-card-header>
      <ion-grid class="ion-no-padding">
        <ion-row>
          <ion-col size="2">
            <ion-thumbnail>
              <ion-skeleton-text animated></ion-skeleton-text>
            </ion-thumbnail>
          </ion-col>
          <ion-col size="10">
            <ion-card-title>
              <ion-skeleton-text style="width: 60%"></ion-skeleton-text>
            </ion-card-title>
            <ion-card-subtitle>
              <ion-skeleton-text animated></ion-skeleton-text>
            </ion-card-subtitle>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card-header>
    <ion-card-content>
      <ion-skeleton-text animated style="width: 88%"></ion-skeleton-text>
      <ion-skeleton-text animated style="width: 70%"></ion-skeleton-text>
      <ion-skeleton-text animated style="width: 60%"></ion-skeleton-text>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import {
  IonCard,
  IonGrid,
  IonRow,
  IonCol,
  IonThumbnail,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonSkeletonText
} from '@ionic/vue';

export default defineComponent({
  name: 'SkeletonCard',
  components: {
    IonCard,
    IonGrid,
    IonRow,
    IonCol,
    IonThumbnail,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonSkeletonText
  }
});
</script>
