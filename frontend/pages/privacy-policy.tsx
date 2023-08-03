import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ShowToast } from "../common/component/common";
import { get, post } from "../common/utils/api";
import { Endpoint } from "../common/utils/endpoints";
import { ApiResponse } from "../common/utils/interface";

const PrivacyPolicy: NextPage = () => {
  const { t } = useTranslation();
  const [cmsData, setCmsData] = useState<any>({});

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    get(`${Endpoint.cms}?slug=privacy`).then((data) => handleResponse(data));
  };

  const handleResponse = (data: ApiResponse) => {
    setCmsData(data?.data);
    if (!data.status) ShowToast(data.message, data.status);
  };

  return (
    <>
      <div className="wrapper-inner-cms">
        <div className="breadcrumb-block">
          <img src="images/breadcrumb-bg.jpg" />
          <div className="container">
            <div className="breadcrumb-head">
              <h4>{cmsData.titleEN}</h4>
            </div>
          </div>
        </div>
        <section className="information-content-section">
          <div className="container">
            <div className="information-content-blk">
              <div dangerouslySetInnerHTML={{ __html: cmsData?.contentEN }} />
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

export default PrivacyPolicy;
