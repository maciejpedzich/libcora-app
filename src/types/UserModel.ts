export default interface UserModel {
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
  dob?: string;
  bio?: string;
  favouriteGenres?: string[];
  location?: string;
}
