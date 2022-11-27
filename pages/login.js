import axios from '../axios';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MsgText } from '../components/elements/MsgText';

function Login() {
  let initialValues = {
    email: '',
    password: '',
  };

  const [currentForm, setCurrentForm] = useState('Candidate');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const notify = (msg_type) => {
    if (msg_type === 'success')
      toast.success(successMsg, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
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
    if (successMsg) {
      notify('success');
    }
  }, [successMsg]);

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
    const data = {
      email: payload.email,
      password: payload.password,
    };

    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    return await axios
      .post('/auth/login', { ...data })
      .then((res) => {
        setIsLoading(false);

        // eslint-disable-next-line no-prototype-builtins
        if (res.data.hasOwnProperty('token')) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          setSuccessMsg('Successfully logged in!');
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error.response?.data?.message);
        const errorMessage = error.response?.data?.message;
        setErrorMsg(errorMessage || error.message);
      });
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
                      src="assets/imgs/page/login-1.png"
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
                                <a className="text-muted" href="#">
                                  Forgot password?
                                </a>
                              </div>
                              <div className="form-group">
                                <button
                                  type="submit"
                                  className="btn btn-heading btn-block hover-up"
                                  name="login"
                                >
                                  Login
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

export default Login;
