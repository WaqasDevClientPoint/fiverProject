import * as yup from "yup";
import { Formik } from "formik";
import { Button } from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import {signUpUser} from "../../services/api";
import localStorageService from "../../services/localStorageService";

const Signup = () => {
  const navigate = useNavigate(); // Use the useNavigate hook
  const [state, setState] = useState({
    email: "",
    username: "",
    password: "",
    repassword: "",
  });

  const handleSubmit = async(values, { setSubmitting }) => {
    try {
      const response = await signUpUser(values); // Replace with your API call
      const user  = response.data.name;
      const token = response.data.token;
      localStorageService.setItem('jwt_token', token);
      navigate('/dashboard/v1');

    } catch (error) {
      alert('Username/Password is not correct!');
    } finally {
    }
  };

  return (
    <div
      className="auth-layout-wrap"
      style={{
        backgroundImage: "url(/assets/images/photo-wide-4.jpg)",
      }}
    >
      <div className="auth-content">
        <div className="card o-hidden">
          <div className="row">
            <div
              className="col-md-6 text-center "
              style={{
                backgroundSize: "cover",
                backgroundImage: "url(/assets/images/photo-long-3.jpg)",
              }}
            >
              <div className="ps-3 auth-right">
                <div className="auth-logo text-center mt-4">
                  <img src="/assets/images/logo.png" alt="" />
                </div>
                <div className="flex-grow-1"></div>
                <div className="w-100 mb-4">

                </div>
                <div className="flex-grow-1"></div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-4">
                <h1 className="mb-3 text-18">Sign Up</h1>
                <Formik
                  initialValues={state}
                  validationSchema={SignupSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="username">Your name</label>
                        <input
                          className="form-control form-control-rounded"
                          name="username"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.username}
                        />
                        {errors.username && touched.username && (
                          <div className="text-danger mt-1 ml-2">
                            {errors.username}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                          name="email"
                          className="form-control form-control-rounded"
                          type="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        {errors.email && touched.email && (
                          <div className="text-danger mt-1 ml-2">
                            {errors.email}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          name="password"
                          className="form-control form-control-rounded"
                          type="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />
                        {errors.password && touched.password && (
                          <div className="text-danger mt-1 ml-2">
                            {errors.password}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="repassword">Retype password</label>
                        <input
                          name="repassword"
                          className="form-control form-control-rounded"
                          type="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.repassword}
                        />
                        {errors.repassword && touched.repassword && (
                          <div className="text-danger mt-1 ml-2">
                            {errors.repassword}
                          </div>
                        )}
                      </div>
                      <button
                        className="btn btn-primary w-100 my-1 btn-rounded mt-3"
                        type="submit"
                      >
                        Sign Up
                      </button>
                    </form>
                  )}
                </Formik>
                <div className="mt-3 text-center">
                  <Link to="/sessions/signin" className="text-muted">
                    <u>SignIn</u>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SignupSchema = yup.object().shape({
  username: yup.string().required("username is required"),
  email: yup.string().email("Invalid email").required("email is required"),
  password: yup
    .string()
    .min(8, "Password must be 8 character long")
    .required("password is required"),
  repassword: yup
    .string()
    .required("repeat password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export default Signup;
