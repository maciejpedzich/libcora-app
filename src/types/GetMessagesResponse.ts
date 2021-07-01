import MessageModel from './MessageModel';

export default interface GetMessagesResponse {
  messages: MessageModel[];
  numPages: number;
}
