import axios from '../axios';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MsgText } from '../components/elements/MsgText';
import { connect } from 'react-redux';
import { SignIn } from '../redux/action/auth';
import { LineWave } from 'react-loader-spinner';

function Login({ auth, SignIn, errors, loader }) {
  let initialValues = {
    email: '',
    password: '',
  };

  const [errorMsg, setErrorMsg] = useState('');
  const notify = (msg_type) => {
    if (msg_type === 'error')
      toast.error(errorMsg, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
  };

  useEffect(() => {
    if (errors.error_msg != '') {
      setErrorMsg(errors.error_msg);
    }
  }, [errors]);

  useEffect(() => {
    if (errorMsg) {
      notify('error');
    }
  }, [errorMsg]);

  // All Validations
  const FormValidationSchema = Yup.object().shape({
    email: Yup.string().trim().required().email().label('Email'),
    password: Yup.string().trim().required().label('Password'),
  });

  const handleSignIn = async (payload) => {
    setErrorMsg('');
    const data = {
      email: payload.email,
      password: payload.password,
    };
    SignIn(data);
  };
  return (
    <>
      <Layout parent="Home" sub="Pages" subChild="Login & Register">
        <div className="page-content pt-150 pb-150">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
                <div className="row">
                  <div className="col-lg-6 pr-30 d-none d-lg-block">
                    <img
                      className="border-radius-15"
                      src="assets/imgs/page/auth-bg.jpeg"
                      alt=""
                    />
                  </div>
                  <div className="col-lg-6 col-md-8">
                    <div className="login_wrap widget-taber-content background-white">
                      <div className="padding_eight_all bg-white">
                        <div className="heading_s1">
                          <h1 className="mb-5">Login</h1>
                          <p className="mb-30">
                            Don't have an account?{' '}
                            <Link href="/register">
                              <a>Register here</a>
                            </Link>
                          </p>
                        </div>
                        <Formik
                          enableReinitialize
                          initialValues={initialValues}
                          onSubmit={handleSignIn}
                          validationSchema={FormValidationSchema}
                        >
                          {({
                            values,
                            handleChange,
                            handleSubmit,
                            setFieldValue,
                            touched,
                            handleBlur,
                            errors,
                          }) => (
                            <form method="post" onSubmit={handleSubmit}>
                              <div className="form-group">
                                <input
                                  type="email"
                                  required=""
                                  name="email"
                                  placeholder="Email *"
                                  value={values.email}
                                  onChange={handleChange('email')}
                                  onBlur={handleBlur('email')}
                                  autoComplete={`${true}`}
                                />
                              </div>
                              {touched.email && errors.email && (
                                <MsgText
                                  text={errors.email}
                                  textColor="danger"
                                />
                              )}
                              <div className="form-group">
                                <input
                                  required=""
                                  type="password"
                                  name="password"
                                  placeholder="Your password *"
                                  value={values.password}
                                  onChange={handleChange('password')}
                                  onBlur={handleBlur('password')}
                                  autoComplete={`${true}`}
                                />
                              </div>
                              {touched.password && errors.password && (
                                <MsgText
                                  text={errors.password}
                                  textColor="danger"
                                />
                              )}

                              <div className="login_footer form-group mb-50">
                                <div className="chek-form">
                                  <div className="custome-checkbox">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name="checkbox"
                                      id="exampleCheckbox1"
                                      value=""
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="exampleCheckbox1"
                                    >
                                      <span>Remember me</span>
                                    </label>
                                  </div>
                                </div>
                                <Link href="/request-password-reset">
                                <a
                                  className="text-muted"
                                >
                                  Forgot password?
                                </a>
                                </Link>
                              </div>
                              <div className="form-group">
                                <button
                                  type="submit"
                                  className="btn btn-heading btn-block hover-up"
                                  name="login"
                                >
                                  {loader.isLoading ? 'loading...' : 'Login'}
                                </button>
                              </div>
                            </form>
                          )}
                        </Formik>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  loader: state.loader,
});

const mapDidpatchToProps = {
  SignIn,
};

export default connect(mapStateToProps, mapDidpatchToProps)(Login);
