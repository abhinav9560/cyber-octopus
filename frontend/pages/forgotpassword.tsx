import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import {
  validateForgotPassword,
  validateLogin,
} from "../common/utils/validation";
import { Formik } from "formik";
import { DefaultInput } from "../common/component/defaultinput";
import { ApiResponse, ForgotPasswordInt } from "../common/utils/interface";
import { post } from "../common/utils/api";
import { Endpoint } from "../common/utils/endpoints";
import { ShowToast } from "../common/component/common";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { tempAction } from "../redux/action/temp";
import { TEMP } from "../redux/constants";
import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const ForgotPassword: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();

  const [canClick, setcanClick] = useState(true);

  const forgotPassword = (values: ForgotPasswordInt) => {
    setcanClick(false);
    if (!canClick) {
      return ShowToast("Please Try Again After Some Time", false);
    }
    post(Endpoint.forgotPassword, values).then((data) =>
      handleForgotPassword(data)
    );
  };

  const handleForgotPassword = (data: ApiResponse) => {
    ShowToast(data.message, data.status);
    setTimeout(() => {
      setcanClick(true);
    }, 10000);
    if (data.status) {
      dispatch(tempAction(TEMP, { otpType: 2, otpId: data?.data?._id }));
      router.push({
        pathname: "otp",
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
                    }}
                    validate={validateForgotPassword}
                    onSubmit={(values, { setSubmitting }) => {
                      console.log(values);
                      forgotPassword(values);
                      setSubmitting(false);
                    }}
                  >
                    {(props) => (
                      <form onSubmit={props.handleSubmit}>
                        <div className="form-head">
                          <h4>{t('Forgot_Password')}</h4>
                          <p>
                           {t('Please_enter_your_email_address_to_receive_a_verification_code')}
                          </p>
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
                        </div>
                        <div className="form-btn-group">
                          <button type="submit" className="btn common-btn">
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

export default ForgotPassword;
