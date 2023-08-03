import type { NextPage } from "next";
import Script from "next/script";

const JSInclude: NextPage = () => {
  return (
    <>
      <Script async type="text/javascript" src="js/jquery-3.3.1.min.js" />

      {/* <Script async type="text/javascript" src="js/bootstrap.min.js" /> */}
      {/* <Script async type="text/javascript" src="js/owl.carousel.min.js" /> */}
      {/* <Script async type="text/javascript" src="js/popper.min.js" /> */}
      {/* <Script async type="text/javascript" src="js/select-drop.js" /> */}

      
    </>
  );
};

export default JSInclude;
