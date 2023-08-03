import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Dashboard from "./common/dashboard";
import { Formik } from "formik";
import {
  validateChangePassword,
  validateProfile,
} from "../common/utils/validation";
import { DefaultInput } from "../common/component/defaultinput";
import { ApiResponse, ChangePasswordInt } from "../common/utils/interface";
import { post } from "../common/utils/api";
import { Endpoint } from "../common/utils/endpoints";
import { ShowToast } from "../common/component/common";
import { useRef } from "react";

const ChangePassword: NextPage = () => {
  const formRef = useRef(null);

  const changePassword = (values: ChangePasswordInt) => {
    post(Endpoint.changePassword, values).then((data) =>
      handleChangePassword(data)
    );
  };

  const handleChangePassword = (data: ApiResponse) => {
    // @ts-ignore
    formRef.current.resetForm()
    ShowToast(data.message, data.status);
    if (data.status) {
      // router.push({
      //   pathname: "otp",
      // });
    } else {
    }
  };

  return (
    <>
      <div className="wrapper-inner-dashboard">
        <section className="dashboard-info-sec">
          <div className="container">
            <div className="dashboard-content-main-block">
              <Dashboard />
              <div className="db-main-content-center">
                <div className="">
                  <img src="images/main-top-img.png" />
                </div>
              </div>

              <div className="db-main-content-right">
                <div className="db-profile-edit-info-blk mt-4">
                  <div className="db-profile-form-head">
                    <h4>Change Password</h4>
                  </div>

                  <div className="db-profile-edit-form">
                    <Formik
                      initialValues={{
                        oldPassword: "",
                        password: "",
                        confirmPassword: "",
                      }}
                      validate={validateChangePassword}
                      onSubmit={(values, { setSubmitting }) => {
                        changePassword(values);
                        setSubmitting(false);
                      }}
                      innerRef={formRef}
                    >
                      {(props) => (
                        <form onSubmit={props.handleSubmit}>
                          <DefaultInput
                            placeholder="Old Password"
                            type={"password"}
                            name={"fName"}
                            value={props.values.oldPassword}
                            onChange={props.handleChange("oldPassword")}
                            onBlur={() =>
                              props.setFieldTouched("oldPassword", true)
                            }
                            error={
                              props.touched.oldPassword &&
                              props.errors.oldPassword
                            }
                          />
                          <DefaultInput
                            placeholder="New Password"
                            type={"password"}
                            name={"fName"}
                            value={props.values.password}
                            onChange={props.handleChange("password")}
                            onBlur={() =>
                              props.setFieldTouched("password", true)
                            }
                            error={
                              props.touched.password && props.errors.password
                            }
                          />
                          <DefaultInput
                            placeholder="Confirm New Password"
                            type={"password"}
                            name={"fName"}
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

                          <button
                            type="submit"
                            className="btn common-btn m-auto"
                          >
                            Submit
                          </button>
                        </form>
                      )}
                    </Formik>
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

export default ChangePassword;
