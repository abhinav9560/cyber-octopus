import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Dashboard from "./common/dashboard";
import { useEffect, useState } from "react";
import { get } from "../common/utils/api";
import { Endpoint } from "../common/utils/endpoints";
import { ApiResponse } from "../common/utils/interface";
import { ShowToast } from "../common/component/common";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Statistics: NextPage = () => {
  const [data, setData] = useState<any>({});
  const { t } = useTranslation();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    get(Endpoint.statistics).then((data) => handleResponse(data));
  };

  const handleResponse = (data: ApiResponse) => {
    setData(data?.data);
    if (!data.status) {
      ShowToast(data.message, data.status);
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
                <div className="db-statistics-info-blk">
                  <div className="db-statistics-info-head mt-4">
                    <h4>{t("Levels")}</h4>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: "50%" }}
                        aria-valuenow={50}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                    <p>945/1500</p>
                  </div>
                  <div className="statistics-info-blk mb-2">
                    <div className="statistics-info-head">
                      <h4>{t("Quests")}</h4>
                      <Link href={"quest-feed"}>
                        <a className="dtl-btn">{t("View_Quests")}</a>
                      </Link>
                    </div>
                    <ul>
                      <li>
                        <h5>{t("Open_Quests")}</h5>
                        <h5>{data?.openQuest}</h5>
                      </li>
                      <li>
                        <h5>{t("Solved_Quests")}</h5>
                        <h5>{data?.closedQuest}</h5>
                      </li>
                      <li>
                        <h5>{t("Total_Quests")}</h5>
                        <h5>{data?.totalQuest}</h5>
                      </li>
                    </ul>
                  </div>
                  <div className="statistics-info-blk">
                    <div className="statistics-info-head">
                      <h4>{t("Awareness")}</h4>
                      <a href="javascript:void(0);" className="dtl-btn">
                        {t("To_Awareness")}
                      </a>
                    </div>
                    <ul>
                      <li>
                        <h5>Modules</h5>
                        <h5>5</h5>
                      </li>
                      <li>
                        <h5>Finished</h5>
                        <h5>1</h5>
                      </li>
                    </ul>
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

export default Statistics;
