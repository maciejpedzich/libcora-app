<template>
  <IonicPageWrapper title="Chat">
    <ion-spinner color="primary" name="lines" v-if="isLoading"></ion-spinner>
    <ion-grid id="message-grid" v-else>
      <ion-row v-for="message in loadedMessages" :key="message.id">
        <ion-col size="4" v-if="message.authorId === userId"></ion-col>
        <ion-col size="8">
          <ion-chip
            :class="[getChipFloat(message), 'message-chip']"
            :color="getChipColour(message)"
          >
            <ion-label class="message-label">
              {{ message.content }}
            </ion-label>
          </ion-chip>
        </ion-col>
        <ion-col size="4" v-if="message.authorId !== userId"></ion-col>
      </ion-row>
    </ion-grid>
    <template v-slot:fixed>
      <ion-grid class="ion-no-padding">
        <ion-row>
          <ion-col class="ion-no-padding" size="10">
            <ion-item>
              <ion-input
                :disabled="isLoading"
                placeholder="Type in your message..."
                v-model="message.content"
              ></ion-input>
            </ion-item>
          </ion-col>
          <ion-col size="2">
            <ion-button
              id="send-button"
              :disabled="isLoading || message.content.length === 0"
              @click="sendMessage"
            >
              <ion-icon slot="icon-only" :md="send"></ion-icon>
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </template>
  </IonicPageWrapper>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, reactive } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

import {
  IonSpinner,
  IonChip,
  IonLabel,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonItem
} from '@ionic/vue';
import { send } from 'ionicons/icons';

import useAuthState from '@/composables/useAuthState';
import useGetMessages from '@/composables/useGetMessages';
import useSocketIo from '@/composables/useSocketIo';
import MessageModel from '@/types/MessageModel';
import displayToastUtil from '@/utils/displayToast';
import determineErrorMessage from '@/utils/determineErrorMessage';

export default defineComponent({
  name: 'MessageUser',
  components: {
    IonSpinner,
    IonChip,
    IonLabel,
    IonInput,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonIcon,
    IonItem
  },
  setup() {
    const route = useRoute();
    const recipientId = route.params.recipientId as string;

    const { userId } = useAuthState();
    const {
      isLoading,
      currentPage,
      maxPages,
      loadedMessages,
      getMessages
    } = useGetMessages(recipientId);
    const {
      socket,
      connectAndListenToEvts,
      removeListenersAndDisconnect
    } = useSocketIo(userId, loadedMessages);

    const message = reactive({ content: '' });

    const sendMessage = async () => {
      try {
        const { data } = await axios.post<MessageModel>(
          `/messages/to/${recipientId}`,
          message
        );

        message.content = '';
        loadedMessages.value.push(data);
        socket.emit('send-message', data);
      } catch (error) {
        displayToastUtil('danger', determineErrorMessage(error));
      }
    };

    const getChipColour = (msg: MessageModel) =>
      msg.authorId === userId.value ? 'secondary' : null;
    const getChipFloat = (msg: MessageModel) =>
      msg.authorId === userId.value ? 'ion-float-right' : 'ion-float-left';

    onMounted(() => {
      connectAndListenToEvts();
      getMessages('push');
    });

    onBeforeUnmount(removeListenersAndDisconnect);

    return {
      isLoading,
      userId,
      currentPage,
      maxPages,
      message,
      loadedMessages,
      getMessages,
      getChipColour,
      getChipFloat,
      sendMessage,
      send
    };
  }
});
</script>

<style scoped>
#message-grid {
  margin-bottom: 3rem;
}

ion-chip.message-chip {
  display: inline-table;
}

ion-label.message-label {
  word-break: break-word;
}

#send-button {
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
