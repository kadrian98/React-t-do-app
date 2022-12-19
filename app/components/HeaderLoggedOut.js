import React, { useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import Axios from "axios";
import DispatchContext from "../DispatchContext";
import { TextField, Button } from "@mui/material";

const HeaderLoggedOut = () => {
  const appDispatch = useContext(DispatchContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    onSubmit: async values => {
      try {
        const response = await Axios.post("/login", values);
        if (response.data) {
          appDispatch({ type: "login", data: response.data });
          appDispatch({
            type: "flashMessage",
            value: "You have sucesfully logged in"
          });
        } else {
          appDispatch({
            type: "errorMessage",
            value: "Invalid username / password"
          });
        }
      } catch (e) {
        appDispatch({
          type: "errorMessage",
          value: "Problem with sending request"
        });
      }
    }
  });

  return (
    <li>
      <button className="btn">Login</button>
      <ul className="dropdown-list">
        <form onSubmit={formik.handleSubmit} id="login-form">
          <TextField
            id="filled-basic"
            label="Username"
            {...formik.getFieldProps("username")}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="off"
            {...formik.getFieldProps("password")}
          />
          <Button type="submit" variant="contained">
            Contained
          </Button>
        </form>
      </ul>
    </li>
  );
};

export default HeaderLoggedOut;
