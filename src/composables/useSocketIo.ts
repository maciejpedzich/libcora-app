import { ComputedRef, Ref } from 'vue';
import { io } from 'socket.io-client';

import useAuthState from './useAuthState';
import MessageModel from '@/types/MessageModel';

export default function useSocketIo(
  userId: ComputedRef<string | null>,
  loadedMessages: Ref<MessageModel[]>
) {
  const { accessToken } = useAuthState();
  const socket = io(process.env.VUE_APP_API_URL as string, {
    extraHeaders: {
      Authorization: accessToken.value ? `Bearer ${accessToken.value}` : ''
    },
    withCredentials: true
  });

  const pushIncomingMessage = (msg: MessageModel) =>
    loadedMessages.value.push(msg);

  const connectAndListenToEvts = () => {
    socket.connect();
    socket.on('incoming-message', pushIncomingMessage);
  };

  const removeListenersAndDisconnect = () => {
    socket.off('incoming-message', pushIncomingMessage);
    socket.emit('remove-uid', userId.value);
    socket.disconnect();
  };

  return { socket, connectAndListenToEvts, removeListenersAndDisconnect };
}
