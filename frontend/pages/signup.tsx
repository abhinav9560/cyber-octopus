import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/router";
import { DefaultInput, DefaultSelect } from "../common/component/defaultinput";
import { Formik } from "formik";
import { validateSignup1, validateSignup2 } from "../common/utils/validation";
import { ApiResponse, SignUp1, SignUp2 } from "../common/utils/interface";
import { post } from "../common/utils/api";
import { Endpoint } from "../common/utils/endpoints";
import { ErrorText, roleArray, ShowToast } from "../common/component/common";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useDispatch, useSelector } from "react-redux";

import { tempAction } from "../redux/action/temp";
import { TEMP } from "../redux/constants/index";

const Signup: NextPage = (props) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const formRef = useRef(null);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    // i18n?.changeLanguage('en')
    // console.log("current locale =>", router.locale);
    // console.log(props);
    dispatch(tempAction(TEMP, { otpType: null, otpId: null }));
  }, []);

  const checkEmail = (values: SignUp1) => {
    post(Endpoint.checkEmail, { email: values.email }).then((data) =>
      handleCheckEmail(data)
    );
  };

  const handleCheckEmail = (data: ApiResponse) => {
    if (data.status) {
      setStep(2);
      // @ts-ignore
      formRef.current.setFieldValue("work", "");
    } else {
      ShowToast(data.message, data.status);
    }
  };

  const signup = (values: SignUp2) => {
    post(Endpoint.signup, values).then((data) => handleSignup(data));
  };

  const handleSignup = (data: ApiResponse) => {
    ShowToast(data.message, data.status);
    if (data.status) {
      dispatch(tempAction(TEMP, { otpType: 1, otpId: data?.data?._id }));
      router.push({
        pathname: "otp",
      });
    } else {
    }
  };

  library.add(fab);
  return (
    <>
      <div className="wrapper-inner-pages">
        <img src="images/main-top-bg.png" />
        <section className="main-form-section">
          <div className="container">
            <div className="main-form-block">
              <div className="main-form-left">
                <img src="images/main-top-img.png" />
              </div>
              <div className="main-form-right">
                <div className="form-block">
                  <div className="form-head">
                    <h4>{t("SIGNUP")}</h4>
                  </div>
                  {step == 1 ? (
                    <Formik
                      initialValues={{
                        fName: "",
                        lName: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                      }}
                      validate={validateSignup1}
                      onSubmit={(values, { setSubmitting }) => {
                        checkEmail(values);
                        setSubmitting(false);
                      }}
                    >
                      {(props) => (
                        <form onSubmit={props.handleSubmit}>
                          <div className="row">
                            <div className="col-md-6">
                              <DefaultInput
                                placeholder={t("FIRSTNAME")}
                                type={"text"}
                                name={"fName"}
                                value={props.values.fName}
                                onChange={props.handleChange("fName")}
                                onBlur={() =>
                                  props.setFieldTouched("fName", true)
                                }
                                error={
                                  props.touched.fName && props.errors.fName
                                }
                              />
                            </div>
                            <div className="col-md-6">
                              <DefaultInput
                                placeholder={t("LASTNAME")}
                                type={"text"}
                                name={"lName"}
                                value={props.values.lName}
                                onChange={props.handleChange("lName")}
                                onBlur={() =>
                                  props.setFieldTouched("lName", true)
                                }
                                error={
                                  props.touched.lName && props.errors.lName
                                }
                              />
                            </div>
                            <div className="col-md-12">
                              <DefaultInput
                                placeholder={t("EMAILADDRESS")}
                                name={"email"}
                                type={"email"}
                                value={props.values.email}
                                onChange={props.handleChange("email")}
                                onBlur={() =>
                                  props.setFieldTouched("email", true)
                                }
                                error={
                                  props.touched.email && props.errors.email
                                }
                              />
                            </div>
                            <div className="col-md-12">
                              <DefaultInput
                                placeholder={t("PASSWORD")}
                                name={"password"}
                                type={"password"}
                                value={props.values.password}
                                onChange={props.handleChange("password")}
                                onBlur={() =>
                                  props.setFieldTouched("password", true)
                                }
                                error={
                                  props.touched.password &&
                                  props.errors.password
                                }
                              />
                            </div>
                            <div className="col-md-12">
                              <DefaultInput
                                placeholder={t("CONFIRMPASSWORD")}
                                name={"confirmPassword"}
                                type={"password"}
                                value={props.values.confirmPassword}
                                onChange={props.handleChange("confirmPassword")}
                                onBlur={() =>
                                  props.setFieldTouched("confirmPassword", true)
                                }
                                error={
                                  props.touched.confirmPassword &&
                                  props.errors.confirmPassword
                                }
                              />
                            </div>
                          </div>
                          <div className="form-btn-group">
                            <button type="submit" className="btn common-btn">
                              {t("CONTINUE")}
                            </button>
                          </div>
                        </form>
                      )}
                    </Formik>
                  ) : (
                    <Formik
                      initialValues={{
                        work: "",
                        roleInCompany: "",
                        TAndC: false,
                      }}
                      validate={validateSignup2}
                      onSubmit={(values, { setSubmitting }) => {
                        console.log(values);
                        signup(values);
                        setSubmitting(false);
                      }}
                      innerRef={formRef}
                    >
                      {(props) => (
                        <form onSubmit={props.handleSubmit}>
                          <div className="row">
                            <div className="col-md-12">
                              <DefaultInput
                                placeholder={t("Company_Name")}
                                name={"work"}
                                type={"text"}
                                label={t("Where_do_you_work")}
                                value={props.values.work}
                                onChange={props.handleChange("work")}
                                onBlur={() =>
                                  props.setFieldTouched("work", true)
                                }
                                error={props.touched.work && props.errors.work}
                              />
                            </div>
                            <div className="col-md-12">
                              <DefaultSelect
                                data={roleArray}
                                name={"roleInCompany"}
                                type={"text"}
                                label={t("What_is_your_role")}
                                // label={'What is your role'}
                                placeholder={t("Please_select_your_role")}
                                value={props.values.roleInCompany}
                                onChange={props.handleChange("roleInCompany")}
                                onBlur={() =>
                                  props.setFieldTouched("roleInCompany", true)
                                }
                                error={
                                  props.touched.roleInCompany &&
                                  props.errors.roleInCompany
                                }
                              />
                            </div>
                          </div>
                          <div
                            className="form-group form-terms-condition"
                            style={{ marginTop: "10px" }}
                          >
                            <label className="coustom-check-box">
                              <input
                                type="checkbox"
                                checked={props.values.TAndC}
                                onChange={() => {
                                  props.setFieldValue(
                                    "TAndC",
                                    !props.values.TAndC
                                  );
                                }}
                              />
                              <span className="checkmark"></span>
                              <p>
                                {t("I_accept")}{" "}
                                <Link href={"/terms-and-condition"}>
                                  <a target={"_blank"}>{t("terms_of_use")}</a>
                                </Link>{" "}
                                &{" "}
                                <Link href={"/privacy-policy"}>
                                  <a target={"_blank"}>{t("Privacy_policy")}</a>
                                </Link>
                              </p>
                              {props.errors.TAndC && (
                                <ErrorText title={props.errors.TAndC} />
                              )}
                            </label>
                          </div>
                          <div className="form-btn-group">
                            <button type="submit" className="btn common-btn">
                              {t("REGISTER")}
                            </button>
                          </div>

                          <div className="form-footer">
                            <a
                              className="back-link"
                              onClick={() => setStep(1)}
                              style={{ cursor: "pointer" }}
                            >
                              <i className="ri-arrow-left-line"></i> {t("BACK")}
                            </a>
                          </div>
                        </form>
                      )}
                    </Formik>
                  )}

                  <div className="form-social-login-blk">
                    <div className="form-social-login-head">
                      <h4>
                        {t("OR")} {t("SIGNUP")}
                      </h4>
                    </div>
                    <div className="row">
                      <ul className="icons-social">
                        <li className="facebook-bg">
                          <img src="images/facebook.svg" />
                        </li>

                        <li className="linkedin-bg">
                          <img src="images/linkden.svg" />
                        </li>

                        <li className="twitter-bg">
                          <img src="images/twitter.svg" />
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="form-footer">
                    <Link href={"login"}>
                      <a className="acc-link">
                        {t("Login_to_your_account_instead")}
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

//@ts-ignore
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Signup;
