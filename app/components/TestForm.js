import React from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import Page from "./Page";

function TestForm() {
  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });
  return (
    <Page title="Test Form">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <button type="submit">Submit</button>
      </form>
    </Page>
  );
}

export default TestForm;
