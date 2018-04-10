import { User, UserMetaData, UserType } from '../model/user';

export class UserDto {
  user_id: string;
  email: string;
  user_metadata: UserMetaData;

  constructor(user: User) {
    this.user_id = user.user_id;
    this.email = user.email;
    this.user_metadata = user.user_metadata;
  }
}
