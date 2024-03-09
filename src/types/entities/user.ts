export type UserType = {
  _id: string;
  email: string;
  username: string;
  name: string;
  type: 'user';
  language: 'en';
  photoUrl: string;
  isVerified: boolean;
  countryCode: 'ID';
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type WithToken = {
  token: string;
};
