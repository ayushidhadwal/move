export type LoginFormValues = {
  number: string;
  password: string;
};

export type RegisterFormValues = {
  username: string;
  fullName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  dob: Date | string;
  gender: number;
};

export type RequestVenueFormValues = {
  venueName: string;
  otherDetails: string;
  location: string;
};

export type ForgotPasswordFormValues = {
  phone: string;
};

export type ChangePasswordValues = {
  password: string;
  confirmPassword: string;
};

export type VerifyValues = {
  otp: string;
};

export type UpdateProfileFormValues = {
  username: string;
  fullName: string;
  email: string;
};

export type VerifyOTPValues = {
  otp: string;
};

export type PhoneValues = {
  phone: string;
};

export type BankDetailsFormValues = {
  accountHolderName: string;
  bankName: string;
  iban: string;
};
export type topUpValues = {
  date: string;
  transactionId: string;
  amtPaid: string;
};
