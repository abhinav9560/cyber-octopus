import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Dashboard from "./common/dashboard";
import { useSelector } from "react-redux";
import { RootState } from "../common/utils/interface";
import { roleArray } from "../common/component/common";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Login: NextPage = () => {
  const { t } = useTranslation();
  const authData = useSelector((state: RootState) => state?.authReducer);

  const getName = (id: any) => {
    let temp = roleArray.filter((ele) => ele.value == id);
    return temp && temp.length ? temp[0].label : "-";
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
                <div className="db-profile-info-blk">
                  <div className="db-profile-blk">
                    <div className="db-profile-img-blk">
                      <figure>
                        <img src={authData.image} />
                      </figure>
                    </div>
                  </div>
                  <div className="db-profile-nm-blk">
                    <h4>
                      {authData?.fName} {authData?.lName}
                    </h4>
                    <p>
                      {`${getName(authData?.roleInCompany)} ${t("At")} ${authData?.work}`}
                    </p>
                  </div>
                  <ul className="db-profile-dtl-blk">
                    <li>
                      <span className="head">{t("CompanyName")} </span>:
                      <span className="text">{authData?.work}</span>
                    </li>

                    <li>
                      <span className="head">{t("EMAILADDRESS")} </span>:
                      <span className="text">{authData?.email}</span>
                    </li>
                  </ul>
                  <Link href={"profile-edit"}>
                    <button className="btn common-btn mb-3">
                      {t("editProfile")}
                    </button>
                  </Link>
                  <Link href={"change-password"}>
                    <button className="btn trans-btn">
                      {t("ChangePassword")}
                    </button>
                  </Link>
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
