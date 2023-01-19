import axios from '../axios';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MsgText } from '../components/elements/MsgText';
import { connect } from 'react-redux';
import { SignUp } from '../redux/action/auth';

function Register({ auth, SignUp, errors, loader }) {
  let initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    password: '',
  };

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [error, setError] = useState('');
  const [ip, setIp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    if (errors.error_msg != '') {
      setErrorMsg(errors.error_msg);
    }
    if(errors.error != ''){
      setError(errors.error)
    }
  }, [errors]);

  useEffect(() => {
    if (auth.message != '') {
      setSuccessMsg(auth.message);
    }
  }, [auth]);

  useEffect(() => {
    if (errorMsg) {
      notify('error');
    }
  }, [errorMsg]);

  useEffect(() => {
    if (successMsg) {
      console.log('success');
      notify('success');
    }
  }, [successMsg]);

  // All Validations
  const FormValidationSchema = Yup.object().shape({
    first_name: Yup.string().trim().required().label('First name'),
    last_name: Yup.string().trim().required().label('Last name'),
    email: Yup.string().trim().required().email().label('Email'),
    phone: Yup.string().trim().required().label('Phone'),
    country: Yup.string().trim().required().label('Country'),
    city: Yup.string().trim().required().label('City'),
    password: Yup.string()
      .trim()
      .required()
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
      )
      .label('Password'),
  });

  const handleSignUp = async (payload) => {
    setError('');
    const data = {
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      phone: payload.phone,
      country: payload.country,
      city: payload.city,
      password: payload.password,
    };
    SignUp(data);
  };
  return (
    <>
      <Layout parent="Home" sub="Pages" subChild="Login & Register">
        <div className="page-content pt-150 pb-150">
          <div className="container">
            <div className="row">
              <div className="col-xl-9 col-lg-10 col-md-12 m-auto">
                <div className="row">
                  <div className="col-lg-5 pr-30 d-none d-lg-block">
                    <img
                      className="border-radius-15"
                      src="assets/imgs/page/auth-bg.jpeg"
                      alt=""
                    />
                  </div>
                  <div className="col-lg-7 col-md-8">
                    <div className="login_wrap widget-taber-content background-white">
                      <div className="padding_eight_all bg-white">
                        <div className="heading_s1">
                          <h1 className="mb-5">Register</h1>
                          <p className="mb-30">
                            Already have an account?{' '}
                            <Link href="/login">
                              <a>Login here</a>
                            </Link>
                          </p>
                        </div>
                        <Formik
                          enableReinitialize
                          initialValues={initialValues}
                          onSubmit={handleSignUp}
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
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      required=""
                                      name="first_name"
                                      placeholder="First name *"
                                      value={values.first_name}
                                      onChange={handleChange('first_name')}
                                      onBlur={handleBlur('first_name')}
                                      autoComplete={`${true}`}
                                    />
                                  </div>
                                  {touched.first_name && errors.first_name && (
                                    <MsgText
                                      text={errors.first_name}
                                      textColor="danger"
                                    />
                                  )}
                                  {error.first_name && (
                                    <MsgText
                                      text={error.first_name[0]}
                                      textColor="danger"
                                    />
                                  )}

                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      required=""
                                      name="last_name"
                                      placeholder="Last name *"
                                      value={values.last_name}
                                      onChange={handleChange('last_name')}
                                      onBlur={handleBlur('last_name')}
                                      autoComplete={`${true}`}
                                    />
                                  </div>
                                  {touched.last_name && errors.last_name && (
                                    <MsgText
                                      text={errors.last_name}
                                      textColor="danger"
                                    />
                                  )}
                                  {error.last_name && (
                                    <MsgText
                                      text={error.last_name[0]}
                                      textColor="danger"
                                    />
                                  )}
                                </div>
                                <div className="col-md-12">
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
                                  {error.email && (
                                    <MsgText
                                      text={error.email[0]}
                                      textColor="danger"
                                    />
                                  )}
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      required=""
                                      name="phone"
                                      placeholder="Phone *"
                                      value={values.phone}
                                      onChange={handleChange('phone')}
                                      onBlur={handleBlur('phone')}
                                      autoComplete={`${true}`}
                                    />
                                  </div>
                                  {touched.phone && errors.phone && (
                                    <MsgText
                                      text={errors.phone}
                                      textColor="danger"
                                    />
                                  )}
                                  {error.phone && (
                                    <MsgText
                                      text={error.phone[0]}
                                      textColor="danger"
                                    />
                                  )}
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      required=""
                                      name="country"
                                      placeholder="Country *"
                                      value={values.country}
                                      onChange={handleChange('country')}
                                      onBlur={handleBlur('country')}
                                      autoComplete={`${true}`}
                                    />
                                  </div>
                                  {touched.country && errors.country && (
                                    <MsgText
                                      text={errors.country}
                                      textColor="danger"
                                    />
                                  )}
                                  {error.country && (
                                    <MsgText
                                      text={error.country[0]}
                                      textColor="danger"
                                    />
                                  )}
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      required=""
                                      name="city"
                                      placeholder="city *"
                                      value={values.city}
                                      onChange={handleChange('city')}
                                      onBlur={handleBlur('city')}
                                      autoComplete={`${true}`}
                                    />
                                  </div>
                                  {touched.city && errors.city && (
                                    <MsgText
                                      text={errors.city}
                                      textColor="danger"
                                    />
                                  )}
                                  {error.city && (
                                    <MsgText
                                      text={error.city[0]}
                                      textColor="danger"
                                    />
                                  )}
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <input
                                      className="password_with_icon"
                                      required=""
                                      type={showPassword ? 'text' : 'password'}
                                      name="password"
                                      placeholder="Your password *"
                                      value={values.password}
                                      onChange={handleChange('password')}
                                      onBlur={handleBlur('password')}
                                      autoComplete={`${true}`}
                                    />
                                    <span className="toggle_pwd" onClick={() => setShowPassword(!showPassword)}><i class={!showPassword ? 'fi-rs-eye' : 'fi-rs-eye-crossed'}></i></span>
                                  </div>
                                  {touched.password && errors.password && (
                                    <MsgText
                                      text={errors.password}
                                      textColor="danger"
                                    />
                                  )}
                                  {error.password && (
                                    <MsgText
                                      text={error.password[0]}
                                      textColor="danger"
                                    />
                                  )}
                                </div>
                              </div>
                              <div className="form-group mt-40">
                                <button
                                  type="submit"
                                  className="btn btn-heading btn-block hover-up"
                                  name="register"
                                >
                                  {loader.isLoading ? 'loading...' : 'Register'}
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
  SignUp,
};

export default connect(mapStateToProps, mapDidpatchToProps)(Register);
