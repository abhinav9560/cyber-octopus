import { Formik } from "formik";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { ShowToast } from "../common/component/common";
import {
  DefaultInput,
  DefaultTextarea,
} from "../common/component/defaultinput";
import { post } from "../common/utils/api";
import { Endpoint } from "../common/utils/endpoints";
import { ApiResponse, ContactUs, RootState } from "../common/utils/interface";
import { validateContactUs, validateLogin } from "../common/utils/validation";
import styles from "../styles/Home.module.css";

const Contact: NextPage = () => {
  const formRef = useRef(null);

  const globalData = useSelector((state: RootState) => state.globalReducer);

  const contactUs = (values: ContactUs) => {
    post(Endpoint.contact, values).then((data) => handleSignup(data));
  };

  const handleSignup = (data: ApiResponse) => {
    ShowToast(data.message, data.status);
    if (data.status) {
    }
  };

  return (
    <>
      <div className="wrapper-inner-cms">
        <div className="breadcrumb-block">
          <img src="images/breadcrumb-bg.jpg" />
          <div className="container">
            <div className="breadcrumb-head">
              <h4>Contact Us</h4>
            </div>
          </div>
        </div>
        <section className="contact-detail-section">
          <div className="container">
            <div className="contact-detail-block">
              <div className="contact-form-blk">
                <h4>Send us a message</h4>
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    message: "",
                  }}
                  validate={validateContactUs}
                  onSubmit={(values, { setSubmitting }) => {
                    contactUs(values);
                    setSubmitting(false);
                  }}
                  innerRef={formRef}
                >
                  {(props) => (
                    <form onSubmit={props.handleSubmit}>
                      <div className="row">
                        <div className="col-md-6">
                          <DefaultInput
                            placeholder="Name"
                            name={"name"}
                            type={"text"}
                            value={props.values.name}
                            onChange={props.handleChange("name")}
                            onBlur={() => props.setFieldTouched("name", true)}
                            error={props.touched.name && props.errors.name}
                          />
                        </div>
                        <div className="col-md-6">
                          <DefaultInput
                            placeholder="Email"
                            name={"email"}
                            type={"email"}
                            value={props.values.email}
                            onChange={props.handleChange("email")}
                            onBlur={() => props.setFieldTouched("email", true)}
                            error={props.touched.email && props.errors.email}
                          />
                        </div>
                        <div className="col-md-12">
                          <DefaultTextarea
                            placeholder="Message"
                            name={"message"}
                            value={props.values.message}
                            onChange={props.handleChange("message")}
                            onBlur={() =>
                              props.setFieldTouched("message", true)
                            }
                            error={
                              props.touched.message && props.errors.message
                            }
                          />
                        </div>
                      </div>
                      <div className="text-left">
                        <button className="btn common-btn w-50">Send</button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
              <div className="contact-info-blk">
                <h4>Contact Information</h4>
                <p>{globalData?.description}</p>
                <ul className="contact-details">
                  <li>
                    <i className="ri-map-pin-2-fill"></i>
                    {globalData?.address}
                  </li>
                  <li>
                    <i className="ri-phone-fill"></i> {globalData?.phone}
                  </li>
                  <li>
                    <i className="ri-mail-fill"></i> {globalData?.email}
                  </li>
                </ul>
              </div>
            </div>
            <div className="contact-map-view">
              <img src="images/cyber-intelligence-img.png" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
