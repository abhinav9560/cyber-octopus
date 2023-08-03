import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Dashboard from "./common/dashboard";
import { DefaultInput, DefaultSelect } from "../common/component/defaultinput";
import { Formik } from "formik";
import { validateLogin, validateProfile } from "../common/utils/validation";
import { useEffect, useRef, useState } from "react";
import { get, post } from "../common/utils/api";
import { Endpoint } from "../common/utils/endpoints";
import { ApiResponse, Profile, RootState } from "../common/utils/interface";
import { roleArray, ShowToast } from "../common/component/common";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../redux/action/auth";
import { AUTH } from "../redux/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Login: NextPage = () => {
  const { t } = useTranslation();
  library.add(fas);
  const formRef = useRef(null);
  const router = useRouter();

  const [image, setImage] = useState<any>();
  const [showImage, setshowImage] = useState<any>();

  const dispatch = useDispatch();
  const authData = useSelector((state: RootState) => state?.authReducer);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    get(Endpoint.profile).then((data) => handleProfileResponse(data));
  };

  const handleProfileResponse = (data: ApiResponse) => {
    if (data?.status) {
      //@ts-ignore
      formRef.current.setFieldValue("fName", data?.data?.fName);
      //@ts-ignore
      formRef.current.setFieldValue("lName", data?.data?.lName);
      //@ts-ignore
      formRef.current.setFieldValue("work", data?.data?.work);
      //@ts-ignore
      formRef.current.setFieldValue("roleInCompany", data?.data?.roleInCompany);
      //@ts-ignore
      setshowImage(data?.imageUrl + data?.data?.image);
    } else {
      ShowToast(data.message, data.status);
    }
  };

  const updateProfile = (values: Profile) => {
    let formData = new FormData();
    for (var ele in values) {
      //@ts-ignore
      formData.append(ele, values[ele]);
    }
    if (image) formData.append("image", image);
    post(Endpoint.profile, formData, 1).then((data) =>
      handleUpdateProfile(data)
    );
  };

  const handleUpdateProfile = (data: ApiResponse) => {
    ShowToast(data.message, data.status);
    if (data.status) {
      dispatch(
        authAction(AUTH, {
          ...authData,
          fName: data?.data?.fName,
          lName: data?.data?.lName,
          roleInCompany: data?.data?.roleInCompany,
          work: data?.data?.work,
          // @ts-ignore
          image: data?.imageUrl + data?.data?.image,
        })
      );
      router.push({
        pathname: "profile",
      });
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
                <div className="db-profile-edit-info-blk">
                  <div className="db-profile-form-head">
                    <h4>{t("EditProfile")}</h4>
                  </div>
                  <div className="edit-profile my-profile">
                    <figure>
                      <img src={showImage} />
                    </figure>
                    <button className="btn edit-btn waves-effect waves-light">
                      <label>
                        <input
                          type="file"
                          id="file"
                          //@ts-ignore
                          onChange={(e) => setImage(e.target.files[0] || null)}
                        />

                        <FontAwesomeIcon
                          icon={["fas", "edit"]}
                          size={"lg"}
                          color={"white"}
                          style={{ padding: "12px 12px 12px 12px" }}
                        />
                      </label>
                    </button>
                  </div>
                  <div className="db-profile-edit-form">
                    <Formik
                      initialValues={{
                        fName: "",
                        lName: "",
                        roleInCompany: "",
                        work: "",
                      }}
                      validate={validateProfile}
                      onSubmit={(values, { setSubmitting }) => {
                        updateProfile(values);
                        setSubmitting(false);
                      }}
                      innerRef={formRef}
                    >
                      {(props) => (
                        <form onSubmit={props.handleSubmit}>
                          <div className="row">
                            <div className="col-md-12">
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
                            <div className="col-md-12">
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
                                placeholder={t("Company_Name")}
                                name={"work"}
                                type={"text"}
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
                                name={"role"}
                                type={"text"}
                                placeholder={t("What_is_your_role")}
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
                          <button
                            type="submit"
                            className="btn common-btn "
                            style={{ marginTop: "10px" }}
                          >
                            {t("Submit")}
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

//@ts-ignore
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Login;
