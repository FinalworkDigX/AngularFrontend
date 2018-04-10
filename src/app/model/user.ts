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
  identities: Identities;
  user_metadata: UserMetaData;
  last_ip: string;
  last_login: Date;
  logins_count: number;
}

export class Identities {
  connection: string;
  user_id: string;
  provider: string;
  isSocial: boolean;
}

export class UserMetaData {
  channel: string;
  type: string;
}
