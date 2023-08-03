import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Dashboard from "./common/dashboard";
import { i18n, useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { post } from "../common/utils/api";
import { Endpoint } from "../common/utils/endpoints";
import { ApiResponse, RootState } from "../common/utils/interface";
import { ShowToast } from "../common/component/common";
import { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Setting: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();

  const authData = useSelector((state: RootState) => state?.authReducer);

  const [isTwoFactor, setisTwoFactor] = useState<any>();

  useEffect(() => {
    updateProfile();
  }, [isTwoFactor]);

  const updateProfile = () => {
    post(Endpoint.editSetting, { isTwoFactor: isTwoFactor }).then((data) =>
      handleSignup(data)
    );
  };

  const handleSignup = (data: ApiResponse) => {
    if (data.status) {
      setisTwoFactor(data.data?.isTwoFactor);
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
                <div className="db-profile-setting-info-blk mt-4">
                  <div className="db-profile-form-head">
                    <h4>Settings</h4>
                  </div>

                  <div className="setting-item-block mb-3">
                    <h2>Notifications</h2>
                    <div className="setting-switch custom-switch-blk mb-2">
                      <div className="custom-switch">
                        <input
                          type="checkbox"
                          className=""
                          id="email"
                          name="email"
                          checked
                        />
                        <label>Email</label>
                      </div>
                    </div>
                    <div className="setting-switch custom-switch-blk mb-2">
                      <div className="custom-switch">
                        <input
                          type="checkbox"
                          className=""
                          id="quest"
                          name="quest"
                        />
                        <label>Quest Answered</label>
                      </div>
                    </div>
                    <div className="setting-switch custom-switch-blk">
                      <div className="custom-switch">
                        <input
                          type="checkbox"
                          className=""
                          id="credits"
                          name="credits"
                        />
                        <label>Low Credits</label>
                      </div>
                    </div>
                  </div>
                  <div className="setting-item-block mb-3">
                    <h2>Design</h2>
                    <div className="setting-switch custom-switch-blk">
                      <div className="custom-switch">
                        <input
                          type="checkbox"
                          className=""
                          id="theme"
                          name="theme"
                          checked
                        />
                        <label>Dark Theme</label>
                      </div>
                    </div>
                  </div>
                  <div className="setting-item-block">
                    <h2>General</h2>
                    <div className="setting-item-tag mb-2">
                      <Link
                        href="/setting"
                        locale={router.locale == "en" ? "gr" : "en"}
                      >
                        <a
                          // onClick={() => languageChange()}
                          className="items-tag"
                        >
                          <h4>Language</h4>
                          <span>
                            {router.locale == "en" ? "English" : "German"}
                          </span>
                        </a>
                      </Link>
                    </div>
                    <div className="setting-item-tag mb-2">
                      <a href="javascript:void(0);" className="items-tag">
                        <h4>Time Zone</h4>
                        <span>GMT+1</span>
                      </a>
                    </div>
                    <div className="setting-switch custom-switch-blk">
                      <div className="custom-switch">
                        <input
                          type="checkbox"
                          className=""
                          id="authentication"
                          name="authentication"
                          checked={isTwoFactor}
                          onChange={(e) => setisTwoFactor(!isTwoFactor)}
                        />
                        <label>Two Factor Authentication Via Email</label>
                      </div>
                    </div>
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

export default Setting;
