export interface Credential {
  id: number;
  emailCredential?: string;
  usernameCredential?: string;
  credentialPassword: string;
  websiteName?: string;
  websiteUrl?: string;
  userId: Number;
  createdAt?: Date;
  updatedAt?: Date;
}
