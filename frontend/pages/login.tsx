import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

import { useDispatch, useSelector } from "react-redux";

import { Formik } from "formik";
import { validateLogin, validateSignup1 } from "../common/utils/validation";
import { DefaultInput } from "../common/component/defaultinput";
import { ApiResponse, LoginInt } from "../common/utils/interface";
import { post } from "../common/utils/api";
import { Endpoint } from "../common/utils/endpoints";
import { ShowToast } from "../common/component/common";
import { tempAction } from "../redux/action/temp";
import { AUTH, TEMP } from "../redux/constants";
import { useRouter } from "next/router";
import { authAction } from "../redux/action/auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Login: NextPage = () => {
  const { t } = useTranslation();
  library.add(fab);
  const router = useRouter();
  const dispatch = useDispatch();

  const login = (values: LoginInt) => {
    post(Endpoint.login, values).then((data) => handleSignup(data));
  };

  const handleSignup = (data: ApiResponse) => {
    ShowToast(data.message, data.status);
    if (data.status) {
      // @ts-ignore
      if (data?.type == 2) {
        dispatch(tempAction(TEMP, { otpType: 3, otpId: data?.data?._id }));
        return router.push({
          pathname: "otp",
        });
      }

      // @ts-ignore
      if (data.otp) {
        dispatch(tempAction(TEMP, { otpType: 1, otpId: data?.data?._id }));
        return router.push({
          pathname: "otp",
        });
      }

      dispatch(
        authAction(AUTH, {
          // @ts-ignore
          token: data?.token,
          userId: data?.data?._id,
          fName: data?.data?.fName,
          lName: data?.data?.lName,
          email: data?.data?.email,
          role: data?.data?.role,
          roleInCompany: data?.data?.roleInCompany,
          work: data?.data?.work,
          // @ts-ignore
          image: data?.imageUrl + data?.data?.image,
        })
      );
      router.push({
        pathname: "home",
      });
    } else {
    }
  };

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
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                    }}
                    validate={validateLogin}
                    onSubmit={(values, { setSubmitting }) => {
                      login(values);
                      setSubmitting(false);
                    }}
                  >
                    {(props) => (
                      <form onSubmit={props.handleSubmit}>
                        <div className="form-head">
                          <h4>{t("Login_to_your_account")}</h4>
                        </div>
                        <div className="row">
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
                              error={props.touched.email && props.errors.email}
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
                                props.touched.password && props.errors.password
                              }
                            />
                          </div>
                        </div>
                        <div className="form-btn-group">
                          <button className="btn common-btn">
                            {t("Login")}
                          </button>
                        </div>

                        <Link href={"forgotpassword"}>
                          <a style={{ color: "#1c6084" }} className="acc-link">
                            {t("Forget_Password")}
                          </a>
                        </Link>

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
                          <Link href={"signup"}>
                            <a className="acc-link">
                              {t("Create_an_account_instead")}
                            </a>
                          </Link>
                        </div>
                      </form>
                    )}
                  </Formik>
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

export default Login;
