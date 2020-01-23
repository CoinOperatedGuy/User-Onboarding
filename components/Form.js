import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Form = ({ errors, touched, values, status }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    status && setUsers(users => [...users, status]);
  }, [status]);

  return (
    <div className="user-form">
      <Form>
        <h1>User Form</h1>
        <Field
          type="text"
          name="name"
          placeholder="Name"
          value={values.name}
        />
        {touched.name && errors.name && <p>{errors.name}</p>}

        <Field type="text" name="email" placeholder="Email" value={values.email} />
        {touched.email && errors.email && <p>{errors.email}</p>}

        <Field type="text" name="email" placeholder="Email" value={values.email} />
        {touched.email && errors.email && <p>{errors.email}</p>}

        <label>
          <Field type="checkbox" name="termsOfService" value={values.checkbox} />
          <p>Terms Of Service</p>
        </label>

        <button type="submit">Submit</button>
      </Form>

      {users.map(user => (
        <ul>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>Password: {user.password}</li>
        </ul>
      ))}
    </div>
  );
};

const FormikForm = withFormik({
  mapPropsToValues({ name }) {
    return {
      name: name || "",
      email: "",
      password: "",
      termsOfService: false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Please fill this in!"),
    email: Yup.string().required("Please fill this in!"),
    password: Yup.string().required("Please fill this in!")
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    console.log("Submitting form:", values);

    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        console.log("Success:", res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.log("Error:", err));
  }
})(Form);
export default FormikForm;
