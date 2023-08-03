import type { NextPage } from "next";
import JSInclude from "../../common/js";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../common/utils/interface";

const Footer: NextPage = () => {
  library.add(fab);
  const { t } = useTranslation();

  const globalData = useSelector((state: RootState) => state.globalReducer);

  return (
    <>
      <footer>
        <div className="footer-menu">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-md-4 footer-content">
                <Link href={"/"}>
                  <a className="footer-logo" href="index.php">
                    <img src="/images/logo.png" />
                  </a>
                </Link>
                <p>{globalData.description}</p>
              </div>

              <div className="col-md-7 offset-md-1">
                <div className="row">
                  <div className="col-md-4 footer-content">
                    <h3>{t("Company")}</h3>
                    <ul className="footer-links">
                      <li>
                        <Link href={"/about"}>
                          <a className="footer-link-item">{t("About_Us")}</a>
                        </Link>
                      </li>
                      <li>
                        <Link href={"/contact"}>
                          <a className="footer-link-item">{t("Contact_Us")}</a>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="col-md-4 footer-content">
                    <h3>{t("Important_links")}</h3>
                    <ul className="footer-links">
                      <li>
                        <Link href={"/terms-and-condition"}>
                          <a className="footer-link-item">
                            {t("Terms_&_Conditions")}
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href={"/privacy-policy"}>
                          <a className="footer-link-item">
                            {t("Privacy_Policy")}
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href={"/faq"}>
                          <a className="footer-link-item">{t("FAQ")}</a>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="col-md-4 footer-content">
                    <h3>{t("Connect_With_Us")}</h3>

                    <ul className="footer-social">
                      <li className="facebook-bg">
                        <Link href={String(globalData.facebook)}>
                          <img src="images/facebook.svg" />
                        </Link>
                      </li>

                      <li className="linkedin-bg">
                        <Link href={String(globalData.linkden)}>
                          <img src="images/linkden.svg" />
                        </Link>
                      </li>

                      <li className="twitter-bg">
                        <Link href={String(globalData.twitter)}>
                          <img src="images/twitter.svg" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="footer-bottom-text">
              <p>{t("Copyright©_Cyber_Octopus_2021_All_rights_reserved")}</p>
            </div>
          </div>
        </div>
      </footer>
      <JSInclude />
    </>
  );
};

//@ts-ignore
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Footer;
