import "../styles/globals.css";

import "../public/css/bootstrap.min.css";
import "../public/css/custom.css";
import "../public/css/responsive.css";
import "../public/css/style.css";

import "react-toastify/dist/ReactToastify.css";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "react-datepicker/dist/react-datepicker.css";

import "devextreme/dist/css/dx.light.css";

import type { AppProps } from "next/app";
import Footer from "./common/footer";
import Header from "./common/header";

import { ToastContainer } from "react-toastify";
import { appWithTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";

import { Provider, useSelector } from "react-redux";
import { store } from "../redux/store";
import { useRouter } from "next/router";
import { RootState } from "../common/utils/interface";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // console.log(router.pathname);

  // const authData = useSelector((state: RootState) => state?.authReducer);
  // console.log(authData)
  // const [lang, setLang] = useState('');
  // useEffect(() => {
  //   setLng();
  // }, []);

  // const setLng = async () => {
  //   // let temp = await serverSideTranslations("en", ["common"]);
  //   // console.log(temp)
  // };
  // router.push({
  //   pathname: "profile",
  // });

  return (
    <div className="dx-viewport">
      <Provider store={store}>
        <Header />
        <Component {...pageProps} />
        <ToastContainer />

        <Footer />
      </Provider>
    </div>
  );
}

// export const getStaticProps = async ({ locale }) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ["common"])),
//   },
// });

export default appWithTranslation(MyApp);
