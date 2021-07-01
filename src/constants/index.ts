const TEN_MINUTES = 6e5;
const MESSAGE_CHUNK_SIZE = 15;
const MAX_NUM_MESSAGES = 45;
const THIRD_CHUNK_START_INDEX = 44;
const GEOLOCATION_DISABLED_ERR_MSG =
  'Please allow geolocation in order to create an account';
const UNEXPECTED_ERR_MSG = 'Unexpected error occurred';
const BOOK_GENRES = [
  'Fantasy',
  'Adventure',
  'Romance',
  'Dystopian',
  'Mystery',
  'Horror',
  'Thriller',
  'Paranormal',
  'Historical Fiction',
  'Science Fiction',
  'Memoir',
  'Cooking',
  'Art',
  'Self-help / Personal',
  'Health',
  'History',
  'Travel',
  'Guide / How-to',
  'Families & Relationships',
  'Humour'
];

export {
  TEN_MINUTES,
  MAX_NUM_MESSAGES,
  MESSAGE_CHUNK_SIZE,
  THIRD_CHUNK_START_INDEX,
  GEOLOCATION_DISABLED_ERR_MSG,
  UNEXPECTED_ERR_MSG,
  BOOK_GENRES
};
