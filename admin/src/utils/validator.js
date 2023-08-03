import { ConstantMessage } from "../constants/validation";

// ******************************* Login validation ******************************* //
export const validateLogin = (values) => {
  const errors = {};
  const warning = ConstantMessage.adminLogin;

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

export const validateForgetPassword = (values) => {
  const errors = {};
  const warning = ConstantMessage.adminLogin;

  if (!values.email) {
    errors.email = warning.email;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = warning.emailInvalid;
  }

  return errors;
};

export const validateResetPassword = (values) => {
  const errors = {};
  const warning = ConstantMessage.adminResetPassword;

  if (!values.password.trim()) {
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
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = warning.passmisMatched;
  }

  return errors;
};

export const validateProfile = (values) => {
  const errors = {};
  const warning = ConstantMessage.profile;

  if (!values.fName) {
    errors.fName = warning.fName;
  }

  if (!values.lName) {
    errors.lName = warning.lName;
  }

  if (!values.mobile) {
    errors.mobile = warning.mobile;
  }

  return errors;
};

export const validateChangePass = (values) => {
  const errors = {};
  const warning = ConstantMessage.changePassword;

  if (!values.currentPassword) {
    errors.currentPassword = warning.currentPassword;
  }

  if (!values.newPassword) {
    errors.newPassword = warning.newPassword;
  } else if (
    !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
      values.newPassword
    )
  ) {
    errors.newPassword = warning.strongPassword;
  }

  if (!values.confirmNewPassword) {
    errors.confirmNewPassword = warning.confirmNewPassword;
  } else if (values.newPassword !== values.confirmNewPassword) {
    errors.confirmNewPassword = warning.passmisMatched;
  }

  return errors;
};

export const validateTechnology = (values) => {
  const errors = {};
  const warning = ConstantMessage.technology;

  if (!values.nameEN) {
    errors.nameEN = warning.nameEN;
  }

  if (!values.nameDE) {
    errors.nameDE = warning.nameDE;
  }

  return errors;
};

export const validateExpert = (values, id) => {
  const errors = {};
  const warning = ConstantMessage.expert;

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

  // if (!values.mobile) {
  //   errors.mobile = warning.mobile;
  // }

  if (!values.experience) {
    errors.experience = warning.experience;
  }

  if (!id) {
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
  }
  return errors;
};

export const validateCustomer = (values, id) => {
  const errors = {};
  const warning = ConstantMessage.expert;

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

  if (!id) {
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
  }
  return errors;
};

export const validateEmail = (values) => {
  const errors = {};
  const warning = ConstantMessage.emailTemplate;

  if (!values.title) {
    errors.title = warning.title;
  }

  if (!values.slug) {
    errors.slug = warning.slug;
  }

  if (!values.content) {
    errors.content = warning.content;
  }

  return errors;
};

export const validateTemplate = (values) => {
  const errors = {};
  const warning = ConstantMessage.template;

  if (!values.titleEN) {
    errors.titleEN = warning.titleEN;
  }

  if (!values.titleDE) {
    errors.titleDE = warning.titleDE;
  }

  if (!values.slug) {
    errors.slug = warning.slug;
  }

  if (!values.contentEN) {
    errors.contentEN = warning.contentEN;
  }

  if (!values.contentDE) {
    errors.contentDE = warning.contentDE;
  }

  return errors;
};

export const validateFaq = (values) => {
  const errors = {};
  const warning = ConstantMessage.faq;

  if (!values.question) {
    errors.question = warning.question;
  }

  if (!values.answer) {
    errors.answer = warning.answer;
  }

  return errors;
};

export const validateAttack = (values) => {
  const errors = {};
  const warning = ConstantMessage.template;

  if (!values.country) {
    errors.country = warning.country;
  } 
  
  if (!values.titleEN) {
    errors.titleEN = warning.titleEN;
  }

  if (!values.titleDE) {
    errors.titleDE = warning.titleDE;
  }

  if (!values.descriptionEN) {
    errors.descriptionEN = warning.descriptionEN;
  }

  if (!values.descriptionDE) {
    errors.descriptionDE = warning.descriptionDE;
  }

  return errors;
};
