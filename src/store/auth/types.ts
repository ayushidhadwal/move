export enum GenderType {
  MALE = '1',
  FEMALE = '2',
}
export type RegisterPayload = {
  username: string;
  fullName: string;
  mobile: string;
  email: string;
  password: string;
  confirmPassword: string;
  dob: string;
  genderId: GenderType;
};

export type LoginPayload = {
  number: string;
  password: string;
};

export type OtpPayload = {
  userId: number;
  otp: string;
  mobile: string;
  verificationFor: string;
};

export type ForgotPasswordPayload = {
  phone: string;
};

export type ChangeNumberPayload = {
  phone: string;
};

export type updatePasswordPayload = {
  password: string | null;
  confirmPassword: string | null;
};

export type AuthSliceState = {
  isLoading: boolean;
  token: string | null;
  userId: number | null;
  chooseSport: string | null;
  language: 'en' | 'ar';
};

export type ForgotPasswordSliceState = {
  userId: number | null;
};
