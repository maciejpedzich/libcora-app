import { ref, watch } from 'vue';
import axios from 'axios';

import determineErrorMessage from '@/utils/determineErrorMessage';
import displayToastUtil from '@/utils/displayToast';
import GetMessagesResponse from '@/types/GetMessagesResponse';
import MessageModel from '@/types/MessageModel';
import { MAX_NUM_MESSAGES, THIRD_CHUNK_START_INDEX } from '@/constants';

export default function useGetMessages(recipientId: string) {
  const isLoading = ref(true);
  const currentPage = ref(0);
  const maxPages = ref(0);
  const loadedMessages = ref<MessageModel[]>([]);

  const getMessages = async (mode: 'push' | 'unshift') => {
    isLoading.value = true;

    try {
      const { data } = await axios.get<GetMessagesResponse>(
        `/messages/to/${recipientId}?page=${currentPage.value}`
      );
      const { messages, numPages } = data;

      loadedMessages.value[mode](...messages);
      maxPages.value = numPages;
      isLoading.value = false;
    } catch (error) {
      displayToastUtil('danger', determineErrorMessage(error));
    }
  };

  watch(currentPage, (newPageCount, prevPageCount) => {
    const mode = newPageCount > prevPageCount ? 'unshift' : 'push';
    getMessages(mode);

    if (loadedMessages.value.length > MAX_NUM_MESSAGES) {
      const spliceOffset =
        newPageCount > prevPageCount ? THIRD_CHUNK_START_INDEX : 0;
      const deleteCount = loadedMessages.value.length - MAX_NUM_MESSAGES;

      loadedMessages.value.splice(spliceOffset, deleteCount);
    }
  });

  return { isLoading, currentPage, maxPages, loadedMessages, getMessages };
}
