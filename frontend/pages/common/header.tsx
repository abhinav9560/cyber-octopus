import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../common/utils/interface";
import { authAction } from "../../redux/action/auth";
import { AUTH } from "../../redux/constants";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Header: NextPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const temp = useSelector((state: RootState) => state?.authReducer);

  const [authData, setauthData] = useState(temp);

  const globalData = useSelector((state: RootState) => state.globalReducer);

  const router = useRouter();

  const [navigation, setnavigation] = useState<any>();

  useEffect(() => {
    checkAuth();
    setauthData(temp);

    window.addEventListener("popstate", (event) => {
      setnavigation(true);
    });
  }, []);

  useEffect(() => {
    checkAuth();
  }, [authData]);

  useEffect(() => {
    setauthData(temp);
  }, [router.pathname]);

  useEffect(() => {
    checkAuth();
  }, [navigation]);

  const checkAuth = () => {
    if (authData.token && authData.email && authData.userId) {
      if (
        router.pathname == "/signup" ||
        router.pathname == "/login" ||
        router.pathname == "/resetpassword" ||
        router.pathname == "/forgotpassword" ||
        router.pathname == "/otp"
      ) {
        router.push("profile");
      }
    } else {
      if (
        router.pathname == "/profile" ||
        router.pathname == "/profile-edit" ||
        router.pathname == "/change-password" ||
        router.pathname == "/home" ||
        router.pathname == "/create-quest" ||
        router.pathname == "/quest-feed" ||
        router.pathname == "/setting" ||
        router.pathname == "/statistics" ||
        router.pathname == "/credits"
      ) {
        localStorage.clear();
        router.push("login");
      }
    }
  };

  const toggleDropDown = () => {
    const div = document.querySelector(".dropdown-menu");
    // @ts-ignore
    if (div.classList.contains("showDropdown")) {
      // @ts-ignore
      document.getElementById("changeToggle").classList.add("hideDropdown");
      // @ts-ignore
      document.getElementById("changeToggle").classList.remove("showDropdown");
    } else {
      // @ts-ignore
      document.getElementById("changeToggle").classList.add("showDropdown");
      // @ts-ignore
      document.getElementById("changeToggle").classList.remove("hideDropdown");
    }
  };

  const doLogout = () => {
    // @ts-ignore
    document.getElementById("changeToggle").classList.remove("showDropdown");
    dispatch(
      authAction(AUTH, {
        token: null,
        userId: null,
        fName: null,
        lName: null,
        email: null,
        role: null,
        work: null,
      })
    );
    router.push("login");
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{t("Cyber_Octopus")}</title>
        <meta
          name="viewport"
          content="minimum-scale=1.0, maximum-scale=1.0,width=device-width, user-scalable=no"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        ></meta>

        <link
          href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="wraper">
        <header className="topHeader" id="fixed-header">
          <div className="container">
            <div className="logo">
              <Link href={"/"}>
                <a>
                  <img src="/images/logo.png" />
                </a>
              </Link>
            </div>
            <nav className="navbar navbar-expand-lg navbar-light">
              <button
                className="btn"
                id="menu-button"
                type="button"
                data-toggle=""
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="nave-bar" id="navbarSupportedContent">
                <ul className="navbar-nav hide-menu" id="hide-menu">
                  <li className="nav-item">
                    <Link href={"/home"}>
                      <a className="nav-link">{t("Quests")}</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#about">
                      {t("Awareness")}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#feature">
                      {t("CCOE")}
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link href={"/after-login-1"}>
                      <a className="nav-link" href="#screendhot">
                        {t("Cyber_Intel")}
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item language-change">
                    <Link
                      href={router?.pathname}
                      locale={router?.locale == "en" ? "gr" : "en"}
                    >
                      <a className="nav-link" href="#screendhot">
                        <img
                          src={
                            router.locale == "en"
                              ? "images/english.png"
                              : "images/german.png"
                          }
                        />{" "}
                        {router.locale == "en" ? "English" : "German"}
                      </a>
                    </Link>
                  </li>
                </ul>
                <>
                  {authData && authData.token && authData.email ? (
                    <ul className="nav-action-group">
                      <li className="dropdown">
                        <a
                          className="user-img btn btn-secondary dropdown-toggle"
                          role="button"
                          id="dropdownMenuLink"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          onClick={toggleDropDown}
                        >
                          <img src={authData.image} />
                        </a>
                        <div
                          id="changeToggle"
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuLink"
                        >
                          <Link href={"/profile"}>
                            <a className="dropdown-item">{t("Profile")}</a>
                          </Link>
                          <a className="dropdown-item" onClick={doLogout}>
                            {t("Logout")}
                          </a>
                        </div>
                      </li>
                    </ul>
                  ) : (
                    <Link href={"/signup"}>
                      <button className="btn nav-btn signupbutton">
                        {t("SIGNUP")}
                      </button>
                    </Link>
                  )}
                </>
              </div>
            </nav>
          </div>
        </header>
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

export default Header;
