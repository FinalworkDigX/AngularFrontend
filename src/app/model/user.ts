export class User {
  // Required for creation
  password: string;
  email: string;
  name: string;

  // Extra to display
  email_verified: boolean;
  user_id:  string;
  picture: string;
  nickname: string;
  created_at: Date;
  updated_at: Date;
  user_metadata: UserMetaData;
  last_ip: string;
  last_login: Date;
  logins_count: number;

  constructor() {
    this.user_metadata = new UserMetaData();
    this.user_metadata.type = UserType.USER;
  }
}

export class UserMetaData {
  channel: string;
  type: UserType;
}

export enum UserType {
  ADMIN = 'admin',
  USER = 'user'
}
