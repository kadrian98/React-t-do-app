import React, { useContext } from "react";
import { useFormik } from "formik";
import Page from "./Page";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import Axios from "axios";
import YupPassword from "yup-password";
import { Container } from "../components/style/formik.style";

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
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(
          12,
          "Password must contain 12 or more characters with at least one of each: uppercase, lowercase, number and special"
        )
        .minLowercase(1, "password must contain at least 1 lower case letter")
        .minUppercase(1, "password must contain at least 1 upper case letter")
        .minNumbers(1, "password must contain at least 1 number")
        .required("Required")
    }),
    onSubmit: async values => {
      const response = await Axios.post("/register", values).catch(err => {
        if (err && err.response.data) {
          appDispatch({
            type: "flashMessage",
            value: err.response.data
          });
        }
      });

      if (response) {
        alert("SEND!!!");
        appDispatch({ type: "login", data: response.data });
        appDispatch({
          type: "flashMessage",
          value: "Congrats! Welcome to your new account."
        });
      }
    }
  });

  return (
    <Page title="Test Form">
      <Container>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            color="warning"
            autoComplete="off"
            id="filled-required"
            required
            label="Username"
            name="username"
            type="username"
            {...formik.getFieldProps("username")}
          />
          {formik.touched.username && formik.errors.username ? (
            <div>{formik.errors.username}</div>
          ) : null}
          <TextField
            autoComplete="off"
            id="filled-required"
            required
            label="Email"
            name="email"
            type="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
          <TextField
            autoComplete="off"
            id="filled-password-input"
            label="Password"
            name="password"
            type="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
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
