import React, { useState, useEffect } from "react";
import AdminLayout from "layouts/Admin.js";
import Auth from "layouts/Auth";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

export default function App() {
  const { token, userId } = useSelector((state) => state.authReducer);

  if (!token && !userId) {
    return <AuthStack />;
  }

  return <Route path="/" render={(props) => <AdminLayout {...props} />} />;
}

const AuthStack = () => {
  return <Route path="/" render={(props) => <Auth {...props} />} />;
};
