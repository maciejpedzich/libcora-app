<template>
  <ion-item>
    <ion-thumbnail slot="start">
      <img :src="avatarUrl" />
    </ion-thumbnail>
    <ion-label>
      <h3>{{ firstname }} {{ lastname }}</h3>
    </ion-label>
  </ion-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { IonItem, IonThumbnail, IonLabel } from '@ionic/vue';

export default defineComponent({
  name: 'UserListItem',
  props: {
    avatarUrl: String,
    firstname: String,
    lastname: String
  },
  components: {
    IonItem,
    IonThumbnail,
    IonLabel
  }
});
</script>
