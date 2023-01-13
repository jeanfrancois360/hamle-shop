import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Layout from '../components/layout/Layout';
import { LineWave } from 'react-loader-spinner';
import { RequestResetPassword } from '../redux/action/auth';
import { useEffect, useState } from 'react';
import { MsgText } from '../components/elements/MsgText';
import { closeLoader } from '../redux/action/loader';
import { BsFillEnvelopeFill } from 'react-icons/bs';
import { useRouter } from 'next/router';

function RequestPasswordReset({
  RequestResetPassword,
  auth,
  errors,
  loader,
  closeLoader,
}) {
  let initialValues = {
    email: '',
  };

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [formValues, setFormValues] = useState(initialValues);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

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
      //setSuccessMsg(auth.message);
      setEmailSent(true);
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
    }
  }, [successMsg]);

  // All Validations
  const formValidationSchema = Yup.object().shape({
    email: Yup.string().trim().email().required().label('Email'),
  });

  const handleSubmit = (payload) => {
    const data = {
      email: payload.email,
      device: 'web',
    };
    RequestResetPassword(data);
  };

  return (
    <>
      <Layout parent="Home" sub="Pages" subChild="About">
        <div className="container pt-50">
          <div className="row">
            <div className="col-xl-10 col-lg-12 m-auto">
              {!emailSent ? (
                <section className="text-center mb-50">
                  <div className="col-lg-6 col-md-6 mb-24 m-auto">
                    <div className="featured-card">
                      <div>
                        <p>
                          Please enter your email address to begin this process.
                        </p>
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
                                  type="email"
                                  name="email"
                                  placeholder="Enter email"
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
              ) : (
                <section className="text-center mb-50">
                  <div className="col-lg-6 col-md-6 mb-24 m-auto">
                    <div className="featured-card pt-1">
                      <div className="mt-4">
                        <BsFillEnvelopeFill color="#CF3F32" size="60" />
                        <h3 className="mt-3">Check Your Email</h3>
                        <p className="mt-2">
                          We have emailed your password reset link!
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              )}
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
  RequestResetPassword,
  closeLoader,
};

export default connect(
  mapStateToProps,
  mapDidpatchToProps
)(RequestPasswordReset);
