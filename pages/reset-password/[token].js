import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Layout from '../../components/layout/Layout';
import { LineWave } from 'react-loader-spinner';
import { ResetPassword } from '../../redux/action/auth';
import { useEffect, useState } from 'react';
import { MsgText } from '../../components/elements/MsgText';
import { closeLoader } from '../../redux/action/loader';
import { useRouter } from 'next/router';

function PasswordReset({ ResetPassword, auth, errors, loader, closeLoader }) {
  let initialValues = {
    password: '',
  };

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [formValues, setFormValues] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { token } = router.query;

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
      notify('success');
      router.push({
        pathname: '/login',
      });
    }
  }, [successMsg]);

  // All Validations
  const formValidationSchema = Yup.object().shape({
    password: Yup.string()
      .trim()
      .required()
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
      )
      .label('Password'),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match'
    ),
  });

  const handleSubmit = (payload) => {
    const data = {
      device: 'web',
      email: localStorage.getItem('user_email') || 'No found',
      password: payload.password,
      token,
    };
    ResetPassword(data);
  };

  return (
    <>
      <Layout parent="Home" sub="Pages" subChild="About">
        <div className="container pt-50">
          <div className="row">
            <div className="col-xl-10 col-lg-12 m-auto">
              <section className="text-center mb-50">
                <div className="col-lg-6 col-md-6 mb-24 m-auto">
                  <div className="featured-card">
                    <div>
                      <p>Please enter your new password.</p>
                      <Formik
                        enableReinitialize
                        initialValues={formValues}
                        onSubmit={handleSubmit}
                        validationSchema={formValidationSchema}
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
                                className="password_with_icon"
                                required=""
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Enter your new password"
                                value={values.password}
                                onChange={handleChange('password')}
                                onBlur={handleBlur('password')}
                                autoComplete={`${true}`}
                              />
                              <span
                                className="toggle_pwd"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                <i
                                  class={
                                    !showPassword
                                      ? 'fi-rs-eye'
                                      : 'fi-rs-eye-crossed'
                                  }
                                ></i>
                              </span>
                            </div>
                            {touched.password && errors.password && (
                              <MsgText
                                text={errors.password}
                                textColor="danger"
                              />
                            )}

                            <br />
                            {loader.isLoading ? (
                              <button
                                disabled
                                type="submit"
                                className="btn btn-lg mt-10"
                              >
                                loading...
                              </button>
                            ) : (
                              <button
                                type="submit"
                                className="btn btn-lg mt-10"
                              >
                                Submit
                              </button>
                            )}
                          </form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              </section>
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
  ResetPassword,
  closeLoader,
};

export default connect(mapStateToProps, mapDidpatchToProps)(PasswordReset);
