export default interface MessageModel {
  id: string;
  dateCreated: Date | string;
  content: string;
  authorId: string;
  recipientId: string;
}
