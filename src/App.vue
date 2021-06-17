<template>
  <IonApp>
    <IonSplitPane content-id="main-content">
      <SideMenu />
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </IonSplitPane>
  </IonApp>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { IonApp, IonSplitPane, IonRouterOutlet } from '@ionic/vue';

import SideMenu from '@/components/ui/SideMenu.vue';
import useAuthState from '@/composables/useAuthState';
import sendAuthRequest from '@/utils/sendAuthRequest';
import AuthState from './types/AuthState';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonSplitPane,
    IonRouterOutlet,
    SideMenu
  },
  setup() {
    const {
      loadState,
      setState,
      saveState,
      isLoggedIn,
      nextRefreshTimestamp,
      accessToken,
      userId
    } = useAuthState();

    onMounted(async () => {
      await loadState();

      if (isLoggedIn.value) {
        const refreshTimeoutId = setTimeout(
          sendAuthRequest,
          Math.max((nextRefreshTimestamp.value as number) - Date.now(), 10),
          '/auth/refresh'
        ).toString();

        const state = reactive<AuthState>({
          accessToken: accessToken.value,
          userId: userId.value,
          nextRefreshTimestamp: nextRefreshTimestamp.value?.toString(),
          refreshTimeoutId
        });

        await setState(state);
        await saveState();
      }
    });
  }
});
</script>
