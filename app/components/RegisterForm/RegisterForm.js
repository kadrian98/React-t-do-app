import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, TextField } from "@mui/material";

const state = {};
export const RegisterForm = () => {
  return (
    <section className="main-container">
      <Formik
        initialValues={{
          username: "",
          password: ""
        }}
        onSubmit={console.log}
      >
        {() => (
          <Form>
            <div className="user-box">
              <Field
                name="username"
                component={({ field }) => (
                  <TextField {...field} name="username" label="Username" />
                )}
              />
            </div>
            <div className="user-box">
              <TextField name="password" type="password" label="Password" />
            </div>

            <Button type="submit">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </section>
  );
};
