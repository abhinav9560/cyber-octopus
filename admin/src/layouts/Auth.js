import React, { Component } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";

import { dashboardRoutes, authRoutes } from "routes.js";
import { ToastContainer, toast } from "react-toastify";
import sidebarImage from "assets/img/sidebar-3.jpg";

function Auth() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/Auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      {/* <div className="wrapper"> */}
      <div className="content">
        <ToastContainer limit={1} />
        <Switch>
          {getRoutes(authRoutes)}
          <Redirect from="/" to="/auth/login" />
        </Switch>
      </div>
      {/* </div> */}
    </>
  );
}

export default Auth;
