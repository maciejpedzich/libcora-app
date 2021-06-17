<template>
  <ion-menu content-id="main-content" type="overlay">
    <ion-content>
      <ion-list id="menu-list">
        <ion-list-header>Libcora</ion-list-header>
        <ion-note>Menu</ion-note>
        <ion-menu-toggle
          auto-hide="false"
          v-for="(p, i) in visibleItems"
          :key="i"
        >
          <ion-item
            router-direction="root"
            :router-link="p.url"
            lines="none"
            detail="false"
            class="hydrated"
            @click="p.action && p.action()"
          >
            <ion-icon slot="start" :md="p.icon"></ion-icon>
            <ion-label>{{ p.title }}</ion-label>
          </ion-item>
        </ion-menu-toggle>
      </ion-list>
      <ion-list id="copy">
        <ion-list-header>&copy; 2021 Maciej Pędzich</ion-list-header>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote
} from '@ionic/vue';

import {
  home,
  heartHalf,
  chatbubbles,
  person,
  logOut,
  logIn,
  personAdd
} from 'ionicons/icons';

import useAuthState from '@/composables/useAuthState';

export default defineComponent({
  name: 'App',
  components: {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote
  },
  setup() {
    const { isLoggedIn, clearState, refreshTimeoutId } = useAuthState();

    const clearUserData = async () => {
      clearTimeout(refreshTimeoutId.value as number);
      await clearState();
    };

    const appPages = [
      {
        title: 'Home',
        url: '/',
        icon: home,
        authRequired: true
      },
      {
        title: 'Your matches',
        url: '/',
        icon: heartHalf,
        authRequired: true
      },
      {
        title: 'Chat',
        url: '/',
        icon: chatbubbles,
        authRequired: true
      },
      {
        title: 'Your profile',
        url: '/',
        icon: person,
        authRequired: true
      },
      {
        title: 'Log out',
        url: '/auth/log-in',
        action: clearUserData,
        icon: logOut,
        authRequired: true
      },
      {
        title: 'Log in',
        url: '/auth/log-in',
        icon: logIn,
        authRequired: false
      },
      {
        title: 'Register',
        url: '/auth/register',
        icon: personAdd,
        authRequired: false
      }
    ];

    const visibleItems = computed(() =>
      appPages.filter((page) => page.authRequired === isLoggedIn.value)
    );

    return {
      appPages,
      visibleItems,
      clearUserData
    };
  }
});
</script>

<style scoped>
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#copy ion-list-header {
  font-size: 16px;
  color: #757575;
  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-note {
  display: inline-block;
  font-size: 16px;
  color: var(--ion-color-medium-shade);
}
</style>
