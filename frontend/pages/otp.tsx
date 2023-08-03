import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { DefaultInput, DefaultOTPInput } from "../common/component/defaultinput";
import { Formik } from "formik";
import { validateOTP, validateSignup2 } from "../common/utils/validation";
import { ErrorText, ShowToast } from "../common/component/common";
import { post } from "../common/utils/api";
import { Endpoint } from "../common/utils/endpoints";
import { ApiResponse, RootState } from "../common/utils/interface";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/router";
import { authAction } from "../redux/action/auth";
import { AUTH } from "../redux/constants";

const Otp: NextPage = () => {
  const dispatch = useDispatch();
  library.add(fab);
  const [canClick, setcanClick] = useState(true);
  const router = useRouter();

  const otpData = useSelector((state: RootState) => state?.tempReducer);

  const otpVerify = (otp: string) => {
    post(Endpoint.verifyOTP, { otp: otp, _id: otpData.otpId,type:otpData.otpType }).then((data) =>
      handleCheckEmail(data)
    );
  };

  const handleCheckEmail = (data: ApiResponse) => {
    ShowToast(data.message, data.status);
    if (data.status) {
      if (otpData.otpType == 1) {
        router.push({
          pathname: "login",
        });
      } else if (otpData.otpType == 2) {
        router.push({
          pathname: "resetpassword",
        });
      }
      else {
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
      }
    } 
  };

  const resendOtp = () => {
    setcanClick(false);
    if (!canClick) {
      return ShowToast("Please Try Again After Some Time", false);
    }
    post(Endpoint.resendOtp, { _id: otpData.otpId }).then((data) =>
      handleResendOtp(data)
    );
  };

  const handleResendOtp = (data: ApiResponse) => {
    console.log(data);
    ShowToast(data.message, data.status);
    setTimeout(() => {
      setcanClick(true);
    }, 10000);
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
                      otp1: "",
                      otp2: "",
                      otp3: "",
                      otp4: "",
                    }}
                    validate={validateOTP}
                    onSubmit={(values, { setSubmitting }) => {
                      console.log(values);
                      let otp =
                        values.otp1 + values.otp2 + values.otp3 + values.otp4;
                      otpVerify(otp);
                      setSubmitting(false);
                    }}
                  >
                    {(props) => (
                      <form className="" onSubmit={props.handleSubmit}>
                        <div className="form-head">
                          <h4>Verification</h4>
                          <p>
                            Enter the verification code sent to your email
                            address.
                          </p>
                        </div>
                        <div className="form-group form-otp-blk">
                          <DefaultOTPInput
                            name={"otp1"}
                            type={"text"}
                            value={props.values.otp1}
                            onChange={props.handleChange("otp1")}
                            onBlur={() => props.setFieldTouched("otp1", true)}
                            maxLength={1}
                          />
                          <DefaultOTPInput
                            name={"otp2"}
                            type={"text"}
                            value={props.values.otp2}
                            onChange={props.handleChange("otp2")}
                            onBlur={() => props.setFieldTouched("otp2", true)}
                            maxLength={1}
                          />
                          <DefaultOTPInput
                            name={"otp3"}
                            type={"text"}
                            value={props.values.otp3}
                            onChange={props.handleChange("otp3")}
                            onBlur={() => props.setFieldTouched("otp3", true)}
                            maxLength={1}
                          />
                          <DefaultOTPInput
                            name={"otp4"}
                            type={"text"}
                            value={props.values.otp4}
                            onChange={props.handleChange("otp4")}
                            onBlur={() => props.setFieldTouched("otp4", true)}
                            maxLength={1}
                          />
                        </div>
                        <ErrorText title={props.errors.otp1} />
                        <div className="form-btn-group">
                          <button type="submit" className="btn common-btn">
                            Submit
                          </button>
                        </div>
                        <div className="not-reg">
                          Didn't get the code? <a onClick={resendOtp}>Resend</a>
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

export default Otp;
