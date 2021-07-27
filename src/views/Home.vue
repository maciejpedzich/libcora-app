<template>
  <IonicPageWrapper title="Home">
    <SkeletonCard v-if="isLoading"></SkeletonCard>
    <ion-card v-else>
      <ion-card-header>
        <ion-grid class="ion-no-padding">
          <ion-row>
            <ion-col size="2">
              <ion-thumbnail>
                <img :src="firstMatchingUser?.avatarUrl" />
              </ion-thumbnail>
            </ion-col>
            <ion-col size="10">
              <ion-card-title>
                {{ matchingUserFullname }}
              </ion-card-title>
              <ion-card-subtitle>{{ matchingUserAge }}</ion-card-subtitle>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card-header>
      <ion-card-content>
        {{ firstMatchingUser?.bio }}
      </ion-card-content>
    </ion-card>
    <ion-grid>
      <ion-row>
        <ion-col id="match-buttons-container">
          <div>
            <ion-button
              class="ion-margin-end"
              color="success"
              :disabled="isLoading"
              @click="sendMatchRequest('favourite')"
            >
              <ion-icon slot="icon-only" :md="thumbsUp"></ion-icon>
            </ion-button>
            <ion-button
              color="danger"
              :disabled="isLoading"
              @click="sendMatchRequest('ignore')"
            >
              <ion-icon slot="icon-only" :md="thumbsDown"></ion-icon>
            </ion-button>
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>
  </IonicPageWrapper>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

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
  IonButton,
  IonIcon
} from '@ionic/vue';
import { thumbsUp, thumbsDown } from 'ionicons/icons';

import SkeletonCard from '@/components/SkeletonCard.vue';
import useUserMatching from '@/composables/useUserMatching';

export default defineComponent({
  name: 'Home',
  components: {
    SkeletonCard,
    IonCard,
    IonGrid,
    IonRow,
    IonCol,
    IonThumbnail,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonIcon
  },
  setup() {
    const {
      isLoading,
      users,
      firstMatchingUser,
      matchingUserFullname,
      matchingUserAge,
      getMatchingUsers,
      sendMatchRequest
    } = useUserMatching();

    onMounted(getMatchingUsers);

    return {
      isLoading,
      users,
      firstMatchingUser,
      matchingUserFullname,
      matchingUserAge,
      getMatchingUsers,
      sendMatchRequest,
      thumbsUp,
      thumbsDown
    };
  }
});
</script>

<style scoped>
#match-buttons-container {
  display: flex;
  justify-content: center;
  padding: 0;
}

#main-content > div.ion-page > ion-content {
  display: flex;
  align-items: center;
}
</style>
