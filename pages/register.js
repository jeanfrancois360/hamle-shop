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
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    password: '',
  };

  const [currentForm, setCurrentForm] = useState('Candidate');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ip, setIp] = useState('');
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

  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/');
    console.log(res.data);
    setIp(res.data.IPv4);
  };

  useEffect(() => {
    getData();
  }, []);

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
    const data = {
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      phone: payload.phone,
      country: payload.country,
      city: payload.city,
      password: payload.password,
    };

    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    return await axios
      .post('/auth/register', { ...data })
      .then((res) => {
        setIsLoading(false);
        console.log({ res });
        // eslint-disable-next-line no-prototype-builtins
        if (res.data.hasOwnProperty('user')) {
          setSuccessMsg('Successfully registered!');
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
              <div className="col-xl-9 col-lg-10 col-md-12 m-auto">
                <div className="row">
                  <div className="col-lg-5 pr-30 d-none d-lg-block">
                    <img
                      className="border-radius-15"
                      src="assets/imgs/page/login-1.png"
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
                                <div class="col-md-6">
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
                                </div>
                                <div class="col-md-6">
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
                                </div>
                                <div className="col-md-6">
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
                                </div>
                              </div>

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
                                  name="register"
                                >
                                  Register
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
