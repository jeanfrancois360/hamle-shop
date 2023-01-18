import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Layout from '../components/layout/Layout';
import { LineWave } from 'react-loader-spinner';
import {
  addOrder,
  orderPayment,
  checkPaymentStatus,
} from '../redux/action/order';
import { useEffect, useState } from 'react';
import { MsgText } from '../components/elements/MsgText';
import { closeLoader } from '../redux/action/loader';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { useRouter } from 'next/router';

function Payment({
  addOrder,
  orderPayment,
  checkPaymentStatus,
  errors,
  order,
  loader,
  closeLoader,
}) {
  let momoInitialValues = {
    phone: '',
  };
  let cardInitialValues = {
    card_number: '',
    phone: '',
  };

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [checkStatus, setCheckStatus] = useState(true);
  const [counter, setCounter] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [mFormValues, setMFormValues] = useState(momoInitialValues);
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
    if (order.message != '') {
      setSuccessMsg(order.message);
    }
  }, [order]);

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
  const mFormValidationSchema = Yup.object().shape({
    phone: Yup.string().trim().required().label('Phone'),
  });

  useEffect(() => {
    if (localStorage.getItem('order-details')) {
      setOrderDetails(JSON.parse(localStorage.getItem('order-details') || ''));
    }
  }, []);

  useEffect(() => {
    if (paymentStatus == 'SUCCESSFUL') {
      router.push({
        pathname: '/payment-succeeded',
      });
    }
    if (paymentStatus == 'FAILED') {
      router.push({
        pathname: '/payment-failed',
      });
    }
  }, [paymentStatus]);

  useEffect(() => {
    if (order.payment_ref && !order.payment_status) {
      checkPaymentStatus(order.payment_ref.reference);
    }
    if (order.payment_status && !order.message) {
      if (order.payment_status.status == 'PENDING' && checkStatus == true) {
        setTimeout(() => {
          checkPaymentStatus(order.payment_ref.reference);
          setCounter(counter + 1);
        }, 5000);

        if (counter === 20) {
          console.log('Time elapsed current status: ', order.payment_status);
          setCheckStatus(false);
          setCounter(0);
          closeLoader();
        }
      } else if (order.payment_status.status == 'FAILED') {
        setSuccessMsg('Your payment was successful!');
        setPaymentStatus('SUCCESSFUL');
        console.log('current status: ', order.payment_status.status);
        setCheckStatus(false);
        closeLoader();
      } else {
        // setPaymentStatus('FAILED');
        console.log('current status: ', order.payment_status.status);
        setCheckStatus(false);
        closeLoader();
      }
    }
  }, [order]);

  const handleMomoPayment = (payload) => {
    let data = {
      amount: orderDetails ? orderDetails.price : 100,
      from: payload.phone.trim().split(' ').join(''),
      description: 'Product(s) payment',
      external_reference: '1',
      external_user: '1',
    };

    orderPayment(data, 'momo');
  };
  return (
    <>
      <Layout parent="Home" sub="Pages" subChild="About">
        <div className="container pt-50">
          <div className="row">
            <div className="col-xl-10 col-lg-12 m-auto">
              {!paymentStatus ? (
                <section className="text-center mb-50">
                  <h2 className="title style-3 mb-40">
                    You are about to pay{' '}
                    <span className="text-brand">
                      {orderDetails
                        ? new Intl.NumberFormat().format(
                            orderDetails.price?.toString()
                          ) + ' XAF'
                        : '...'}
                    </span>
                  </h2>

                  <div className="col-lg-6 col-md-6 mb-24 m-auto">
                    <div className="featured-card">
                      <div>
                        <p>
                          Please enter your mobile money details to begin
                          payment.
                        </p>
                        <Formik
                          enableReinitialize
                          initialValues={mFormValues}
                          onSubmit={handleMomoPayment}
                          validationSchema={mFormValidationSchema}
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
                                  type="text"
                                  name="phone"
                                  placeholder="Enter phone number"
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
                                  Pay{' '}
                                  {orderDetails
                                    ? new Intl.NumberFormat().format(
                                        orderDetails.price?.toString()
                                      )
                                    : '0'}{' '}
                                  XAF
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
                        <BsFillBagCheckFill color="#8AC53F" size="60" />
                        <h3 className="mt-3">Congratulations!</h3>
                        <p className="mt-2">
                          Your order is successfully processed now!
                        </p>
                      </div>
                      <a href="products" className="btn">
                        <i className="fi-rs-shopping-bag mr-10"></i>
                        Continue Shopping
                      </a>
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
  order: state.order,
  errors: state.errors,
  loader: state.loader,
});

const mapDidpatchToProps = {
  addOrder,
  orderPayment,
  checkPaymentStatus,
  closeLoader,
};

export default connect(mapStateToProps, mapDidpatchToProps)(Payment);
