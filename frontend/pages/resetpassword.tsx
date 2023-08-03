import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Formik } from "formik";
import { DefaultInput } from "../common/component/defaultinput";
import {
  ApiResponse,
  ForgotPasswordInt,
  ResetPasswordInt,
  RootState,
} from "../common/utils/interface";
import { post } from "../common/utils/api";
import { Endpoint } from "../common/utils/endpoints";
import { ShowToast } from "../common/component/common";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { tempAction } from "../redux/action/temp";
import { TEMP } from "../redux/constants";
import { useState } from "react";
import {
  validateForgotPassword,
  validateResetPassword,
} from "../common/utils/validation";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const ResetPassword: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const otpData = useSelector((state: RootState) => state?.tempReducer);

  const [canClick, setcanClick] = useState(true);

  const resetPassword = (values: ResetPasswordInt) => {
       //@ts-ignore
    values._id = otpData.otpId;
    post(Endpoint.resetPassword, values).then((data) =>
      handleForgotPassword(data)
    );
  };

  const handleForgotPassword = (data: ApiResponse) => {
    ShowToast(data.message, data.status);

    if (data.status) {
      router.push({
        pathname: "login",
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
                      password: "",
                      confirmPassword: "",
                    }}
                    validate={validateResetPassword}
                    onSubmit={(values, { setSubmitting }) => {
                      console.log(values);
                      resetPassword(values);
                      setSubmitting(false);
                    }}
                  >
                    {(props) => (
                      <form onSubmit={props.handleSubmit}>
                        <div className="form-head">
                          <h4>{t('Reset_Password')}</h4>
                          <p>
                            {t('This_will_reset_your_password_Please_enter_the_new_password_and_Confirm_it')}
                          </p>
                        </div>
                        <div className="row">
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
                          <button className="btn common-btn" type="submit">
                          {t('Submit')}
                          </button>
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

export default ResetPassword;
