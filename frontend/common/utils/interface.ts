export interface ApiResponse {
  status: boolean;
  message: string;
  data: any;
}

export interface SignUp1 {
  fName: string;
  lName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUp2 {
  work: string;
  roleInCompany: string;
  TAndC: boolean;
}

export interface LoginInt {
  email: string;
  password: string;
}

export interface OTP {
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
}

export interface RootState {
  tempReducer: any;
  authReducer: any;
  globalReducer: any;
}

export interface Profile {
  fName: string;
  lName: string;
  work: string;
  roleInCompany: string;
}

export interface ChangePasswordInt {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordInt {
  email: string;
}

export interface ResetPasswordInt {
  password: string;
  confirmPassword: string;
}

export interface ContactUs {
  name: string;
  email: string;
  message: string;
}

export interface QuestTitle {
  title: string;
  description: string;
}
