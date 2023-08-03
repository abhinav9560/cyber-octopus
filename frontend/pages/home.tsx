import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Home: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <>
      <div className="wrapper-inner-dashboard">
        <section className="after-login-sec">
          <div className="container">
            <div className="after-login-map-blk">
              <img src="images/after-login-map.png" />
              <div className="middle-logo">
                <Link href={"after-login-1"}>
                  <a className="middle-logo-btn">{t("Cyber_Intel")}</a>
                </Link>
              </div>
              <div className="quests-blk">
                <h4>{t("Quests")}</h4>
                <p>Quest Management</p>
                <div className="quests-actions">
                  <Link href={"create-quest"}>
                    <a className="active">{t("New_Quest")}</a>
                  </Link>
                  <Link href={"quest-feed"}>
                    <a>{t("Quest_Feed")}</a>
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

export default Home;
