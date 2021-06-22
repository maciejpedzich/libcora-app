<template>
  <ion-item>
    <ion-thumbnail slot="start">
      <ion-skeleton-text animated></ion-skeleton-text>
    </ion-thumbnail>
    <ion-label>
      <h3>
        <ion-skeleton-text animated style="width: 50%"></ion-skeleton-text>
      </h3>
      <p>
        <ion-skeleton-text animated style="width: 80%"></ion-skeleton-text>
      </p>
      <p>
        <ion-skeleton-text animated style="width: 60%"></ion-skeleton-text>
      </p>
    </ion-label>
  </ion-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { IonItem, IonThumbnail, IonLabel, IonSkeletonText } from '@ionic/vue';

export default defineComponent({
  name: 'SkeletonListItem',
  components: {
    IonItem,
    IonThumbnail,
    IonLabel,
    IonSkeletonText
  }
});
</script>
