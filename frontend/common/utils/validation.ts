import { ConstantMessage } from "./message";
import {
  ChangePasswordInt,
  ContactUs,
  ForgotPasswordInt,
  LoginInt,
  OTP,
  Profile,
  QuestTitle,
  ResetPasswordInt,
  SignUp1,
  SignUp2,
} from "./interface";
import { checkLanguage } from "../component/common";

export const validateSignup1 = (values: SignUp1) => {
  const errors = {} as SignUp1;
  const warning = ConstantMessage.signup1;
  console.log(checkLanguage());

  if (!values.fName) {
    errors.fName = warning.fName;
  }

  if (!values.lName) {
    errors.lName = warning.lName;
  }

  if (!values.email) {
    errors.email = warning.email;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = warning.emailInvalid;
  }

  if (!values.password) {
    errors.password = warning.password;
  } else if (
    !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
      values.password
    )
  ) {
    errors.password = warning.strongPassword;
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = warning.confirmPassword;
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = warning.passmisMatched;
  }

  return errors;
};
export const validateSignup2 = (values: SignUp2) => {
  const errors = {} as any;
  const warning = ConstantMessage.signup2;

  if (!values.work) {
    errors.work = warning.work;
  }

  if (!values.roleInCompany) {
    errors.roleInCompany = warning.roleInCompany;
  }

  if (!values.TAndC) {
    errors.TAndC = warning.TAndC;
  }

  return errors;
};

export const validateOTP = (values: OTP) => {
  const errors = {} as any;
  const warning = ConstantMessage.otp;
  let otp = values.otp1 + values.otp2 + values.otp3 + values.otp4;
  if (otp.trim().length !== 4) {
    errors.otp1 = warning.otp;
  }
  if (!isNaN(Number(otp))) {
  } else {
    errors.otp1 = warning.otp;
  }

  return errors;
};

export const validateLogin = (values: LoginInt) => {
  const errors = {} as any;
  const warning = ConstantMessage.login;

  if (!values.email) {
    errors.email = warning.email;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = warning.emailInvalid;
  }

  if (!values.password) {
    errors.password = warning.password;
  }
  return errors;
};

export const validateProfile = (values: Profile) => {
  const errors = {} as any;
  const warning = ConstantMessage.profile;

  if (!values.fName) {
    errors.fName = warning.fName;
  }

  if (!values.lName) {
    errors.lName = warning.lName;
  }

  if (!values.work) {
    errors.work = warning.work;
  }

  if (!values.roleInCompany) {
    errors.roleInCompany = warning.roleInCompany;
  }

  return errors;
};

export const validateChangePassword = (values: ChangePasswordInt) => {
  const errors = {} as any;
  const warning = ConstantMessage.changePassword;

  if (!values.oldPassword) {
    errors.oldPassword = warning.password;
  }

  if (!values.password) {
    errors.password = warning.password;
  } else if (
    !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
      values.password
    )
  ) {
    errors.password = warning.strongPassword;
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = warning.confirmPassword;
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = warning.passmisMatched;
  }
  return errors;
};

export const validateForgotPassword = (values: ForgotPasswordInt) => {
  const errors = {} as any;
  const warning = ConstantMessage.forgotPassword;

  if (!values.email) {
    errors.email = warning.email;
  }

  return errors;
};

export const validateResetPassword = (values: ResetPasswordInt) => {
  const errors = {} as any;
  const warning = ConstantMessage.resetPassword;

  if (!values.password) {
    errors.password = warning.password;
  } else if (
    !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
      values.password
    )
  ) {
    errors.password = warning.strongPassword;
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = warning.confirmPassword;
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = warning.passmisMatched;
  }

  return errors;
};

export const validateContactUs = (values: ContactUs) => {
  const errors = {} as any;
  const warning = ConstantMessage.contactUs;

  if (!values.name) {
    errors.name = warning.name;
  }

  if (!values.email) {
    errors.email = warning.email;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = warning.emailInvalid;
  }

  if (!values.message) {
    errors.message = warning.message;
  }

  return errors;
};

export const validateQuestTitle = (values: QuestTitle) => {
  const errors = {} as any;
  const warning = ConstantMessage.questTitle;

  if (!values.title) {
    errors.title = warning.title;
  } else if (values.title.trim().length < 3) {
    errors.title = warning.titleValid;
  }

  if (!values.description) {
    errors.description = warning.description;
  } else if (values.description.trim().length < 3) {
    errors.description = warning.descriptionValid;
  }

  return errors;
};
