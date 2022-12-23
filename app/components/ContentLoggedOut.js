import React, { useContext } from "react";
import { useFormik } from "formik";
import Page from "./Page";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import Axios from "axios";
import YupPassword from "yup-password";
import { Container } from "./style/formik.style";

import DispatchContext from "../DispatchContext";

const TestForm = () => {
  YupPassword(Yup);
  const appDispatch = useContext(DispatchContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, "Must be 5 characters or more")
        .max(15, "Must be 15 characters or less")
        .required("Please fill in this field"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Please fill in this field"),
      password: Yup.string()
        .min(
          8,
          "Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
        )
        .minLowercase(1, "password must contain at least 1 lower case letter")
        .minUppercase(1, "password must contain at least 1 upper case letter")
        .minNumbers(1, "password must contain at least 1 number")
        .required("Please fill in this field")
    }),
    onSubmit: async values => {
      const response = await Axios.post("/register", values).catch(err => {
        if (err && err.response.data) {
          appDispatch({
            type: "errorMessage",
            value: err.response.data
          });
          s;
        }
      });

      if (response) {
        appDispatch({ type: "login", data: response.data });
        appDispatch({
          type: "flashMessage",
          value: "Congrats! Welcome to your new account."
        });
      }
    }
  });

  return (
    <Page title="To-do React app">
      <Container>
        <form onSubmit={formik.handleSubmit}>
          <h1>Welcome on my React app!</h1>
          <TextField
            autoComplete="off"
            id="filled-required"
            type="username"
            label="Username"
            variant="standard"
            color="secondary"
            focused
            {...formik.getFieldProps("username")}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="required-div">{formik.errors.username}</div>
          ) : null}
          <TextField
            autoComplete="off"
            id="filled-required"
            type="email"
            label="Email"
            variant="standard"
            color="secondary"
            focused
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="required-div">{formik.errors.email}</div>
          ) : null}
          <TextField
            autoComplete="off"
            id="outlined-password-input"
            label="Password"
            type="password"
            focused
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="required-div">{formik.errors.password}</div>
          ) : null}
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </Container>
    </Page>
  );
};
export default TestForm;
