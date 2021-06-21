export default interface UserModel {
  id?: string;
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
  dob?: string;
  bio?: string;
  favouriteGenres?: string[];
  location?: string;
  avatarUrl?: string;
}
