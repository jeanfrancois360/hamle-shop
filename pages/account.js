/* eslint-disable no-prototype-builtins */
import Layout from '../components/layout/Layout';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Protected } from '../components/Protected';
import { connect } from 'react-redux';
import { getOrders } from '../redux/action/order';
import moment from 'moment';
import {
  Logout,
  UpdateAccount,
  DeleteAccount,
  ChangePassword,
} from '../redux/action/auth';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MsgText } from '../components/elements/MsgText';
import { useRouter } from 'next/router';
import { getMyPlan } from '../redux/action/product';
import { cancelPlan } from '../redux/action/product';

function Account({
  getOrders,
  orders,
  Logout,
  UpdateAccount,
  errors,
  auth,
  DeleteAccount,
  ChangePassword,
  getMyPlan,
  products,
  cancelPlan
}) {
  const router = useRouter();
  let initialValues = {
    first_name: '',
    last_name: '',
    country: '',
    city: '',
    email: '',
    phone: '',
  };
  let initialPWDValues = {
    current_password: '',
    new_password: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formPWDValues, setFormPWDValues] = useState(initialPWDValues);
  const [activeIndex, setActiveIndex] = useState(1);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [myPlan, setMyPlan] = useState('')
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
    if (products.message != '') {
      setSuccessMsg(products.message);
    }
  }, [products]);

  useEffect(() => {
    if (errorMsg) {
      notify('error');
    }
  }, [errorMsg]);

  useEffect(() => {
    if (successMsg) {
      getOrders();
      notify('success');
    }
  }, [successMsg]);

  const handleOnClick = (index) => {
    localStorage.setItem('activeIndex', index);
    setActiveIndex(index); // remove the curly braces
  };
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check active index
    let index = parseInt(localStorage.getItem('activeIndex'));
    if (index && index > 0) {
      setActiveIndex(index);
    }
    if (localStorage.getItem('isAuthenticated')) {
      setUser(JSON.parse(localStorage.getItem('user')));
      setToken(localStorage.getItem('token'));
    }
    getOrders();
    getMyPlan();
  }, []);

  useEffect(() => {
    if (user) {
      setFormValues({
        first_name: user.first_name,
        last_name: user.last_name,
        country: user.country,
        city: user.city,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user]);

  useEffect(() => {
    if (products.plan) {
      console.log(products.plan)
      setMyPlan(products.plan);
    }
  }, [products]);

  // All Validations
  const PwdValidationSchema = Yup.object().shape({
    current_password: Yup.string()
      .trim()
      .required()
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
      )
      .label('Current Password'),
    new_password: Yup.string()
      .trim()
      .required()
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
      )
      .label('New Password'),
  });

  // All Validations
  const FormValidationSchema = Yup.object().shape({
    first_name: Yup.string().trim().required().label('First name'),
    last_name: Yup.string().trim().required().label('Last name'),
    email: Yup.string().trim().required().email().label('Email'),
    phone: Yup.string().trim().required().label('Phone'),
    country: Yup.string().trim().required().label('Country'),
    city: Yup.string().trim().required().label('City'),
  });

  const handleLogout = (e) => {
    e.preventDefault();
    if (token) {
      Logout(token);
    }
  };

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    var result = confirm('Are you sure you want to delete this account?');
    if (result) {
      if (token) {
        DeleteAccount(token);
      }
    }
  };

  const handleCancelPlan = (e) => {
    e.preventDefault();
    cancelPlan();
  }

  const handleChangePlan = (e) => {
    e.preventDefault();
    router.push({
      pathname: '/membership',
    });
  }

  const handleUpdateAccount = (payload) => {
    const data = {
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      phone: payload.phone,
      country: payload.country,
      city: payload.city,
    };

    UpdateAccount(data);
  };

  const handleUpdatePassword = (payload) => {
    const data = {
      'current-password': payload.current_password,
      'new-password': payload.new_password,
    };

    ChangePassword(data);
  };

  return (
    <>
      <Protected>
        <Layout parent="Home" sub="Pages" subChild="Account">
          <div className="page-content pt-150 pb-150">
            <div className="container">
              <div className="row">
                <div className="col-lg-10 m-auto">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="dashboard-menu">
                        <ul className="nav flex-column" role="tablist">
                          <li className="nav-item">
                            <a
                              className={
                                activeIndex === 1
                                  ? 'nav-link active'
                                  : 'nav-link'
                              }
                              onClick={() => handleOnClick(1)}
                            >
                              <i className="fi-rs-settings-sliders mr-10"></i>
                              Dashboard
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className={
                                activeIndex === 2
                                  ? 'nav-link active'
                                  : 'nav-link'
                              }
                              onClick={() => handleOnClick(2)}
                            >
                              <i className="fi-rs-shopping-bag mr-10"></i>Orders
                            </a>
                          </li>

                          <li className="nav-item">
                            <a
                              className={
                                activeIndex === 5
                                  ? 'nav-link active'
                                  : 'nav-link'
                              }
                              onClick={() => handleOnClick(5)}
                            >
                              <i className="fi-rs-user mr-10"></i>Account
                              details
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              onClick={(e) => handleLogout(e)}
                              className="nav-link"
                            >
                              <i className="fi-rs-sign-out mr-10"></i>Logout
                            </a>
                          </li>
                          <li className="nav-item remove-acc-btn">
                            <a
                              onClick={(e) => handleDeleteAccount(e)}
                              className="nav-link"
                            >
                              <i className="fi-rs-trash mr-10"></i>Delete
                              Account
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="tab-content account dashboard-content pl-50">
                        <div
                          className={
                            activeIndex === 1
                              ? 'tab-pane fade active show'
                              : 'tab-pane fade '
                          }
                        >
                          <div className="card">
                            <div className="card-header">
                              <h3 className="mb-0">
                                Hello {user?.first_name} {user?.last_name}
                              </h3>
                            </div>
                            <div className="card-body">
                              <p>
                                From your account dashboard. you can easily
                                check &amp; view your{' '}
                                <a onClick={() => handleOnClick(2)} href="#">
                                  recent orders
                                </a>
                                ,
                                <br />
                                and{' '}
                                <a onClick={() => handleOnClick(5)} href="#">
                                  edit your password and account details.
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className={
                            activeIndex === 2
                              ? 'tab-pane fade active show'
                              : 'tab-pane fade '
                          }
                        >
                          <div className="card">
                            <div className="card-header">
                              <h3 className="mb-0">Your Orders</h3>
                            </div>
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th>Order</th>
                                      <th>Date</th>
                                      <th>Status</th>
                                      <th>Total</th>
                                      <th>Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {orders &&
                                      orders.items.length > 0 &&
                                      orders.items.map((order) => (
                                        <tr key={order.id}>
                                          <td>#{order.id}</td>
                                          <td>
                                            {moment(order.created_at).format(
                                              'MMM D, YYYY'
                                            )}
                                          </td>
                                          <td>{order.state}</td>
                                          <td>
                                            {' '}
                                            {new Intl.NumberFormat().format(
                                              order.price?.toString()
                                            )}{' '}
                                            XAF
                                          </td>
                                          <td>
                                            <a
                                              href="#"
                                              className="btn-small d-block"
                                            >
                                              View details
                                            </a>
                                          </td>
                                        </tr>
                                      ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className={
                            activeIndex === 5
                              ? 'tab-pane fade active show'
                              : 'tab-pane fade '
                          }
                        >
                          <div className="card">
                            <div className="card-header">
                              <h5>Account Details</h5>
                            </div>
                            <div className="card-body">
                              <Formik
                                enableReinitialize
                                initialValues={formValues}
                                onSubmit={handleUpdateAccount}
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
                                          <label>
                                            First Name{' '}
                                            <span className="required">*</span>
                                          </label>
                                          <input
                                            required=""
                                            className="form-control"
                                            name="first_name"
                                            type="text"
                                            value={values.first_name}
                                            onChange={handleChange(
                                              'first_name'
                                            )}
                                            onBlur={handleBlur('first_name')}
                                            autoComplete={`${true}`}
                                          />
                                        </div>
                                        {touched.first_name &&
                                          errors.first_name && (
                                            <MsgText
                                              text={errors.first_name}
                                              textColor="danger"
                                            />
                                          )}
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label>
                                            Last Name{' '}
                                            <span className="required">*</span>
                                          </label>
                                          <input
                                            required=""
                                            className="form-control"
                                            name="last_name"
                                            value={values.last_name}
                                            onChange={handleChange('last_name')}
                                            onBlur={handleBlur('last_name')}
                                            autoComplete={`${true}`}
                                          />
                                        </div>
                                        {touched.last_name &&
                                          errors.last_name && (
                                            <MsgText
                                              text={errors.last_name}
                                              textColor="danger"
                                            />
                                          )}
                                      </div>

                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label>
                                            Email Address{' '}
                                            <span className="required">*</span>
                                          </label>
                                          <input
                                            required=""
                                            className="form-control"
                                            name="email"
                                            type="email"
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
                                          <label>
                                            Phone{' '}
                                            <span className="required">*</span>
                                          </label>
                                          <input
                                            required=""
                                            className="form-control"
                                            name="phone"
                                            type="text"
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
                                          <label>
                                            City{' '}
                                            <span className="required">*</span>
                                          </label>
                                          <input
                                            required=""
                                            className="form-control"
                                            name="city"
                                            type="text"
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
                                          <label>
                                            Country{' '}
                                            <span className="required">*</span>
                                          </label>
                                          <input
                                            required=""
                                            className="form-control"
                                            name="country"
                                            type="text"
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
                                      <div className="col-md-12">
                                        <button
                                          type="submit"
                                          className="btn btn-fill-out submit font-weight-bold"
                                          name="submit"
                                          value="Submit"
                                        >
                                          Update Account
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                )}
                              </Formik>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <h5>Change Password</h5>
                            </div>
                            <div className="card-body">
                              <Formik
                                enableReinitialize
                                initialValues={formPWDValues}
                                onSubmit={handleUpdatePassword}
                                validationSchema={PwdValidationSchema}
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
                                          <label>
                                            Current Password{' '}
                                            <span className="required">*</span>
                                          </label>
                                          <input
                                            required=""
                                            className="form-control"
                                            name="current_password"
                                            type="password"
                                            value={values.current_password}
                                            onChange={handleChange(
                                              'current_password'
                                            )}
                                            onBlur={handleBlur(
                                              'current_password'
                                            )}
                                            autoComplete={`${true}`}
                                          />
                                        </div>
                                        {touched.current_password &&
                                          errors.current_password && (
                                            <MsgText
                                              text={errors.current_password}
                                              textColor="danger"
                                            />
                                          )}
                                      </div>

                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label>
                                            New Password{' '}
                                            <span className="required">*</span>
                                          </label>
                                          <input
                                            required=""
                                            className="form-control"
                                            name="new_password"
                                            type="password"
                                            value={values.new_password}
                                            onChange={handleChange(
                                              'new_password'
                                            )}
                                            onBlur={handleBlur('new_password')}
                                            autoComplete={`${true}`}
                                          />
                                        </div>
                                        {touched.new_password &&
                                          errors.new_password && (
                                            <MsgText
                                              text={errors.new_password}
                                              textColor="danger"
                                            />
                                          )}
                                      </div>

                                      <div className="col-md-12">
                                        <button
                                          type="submit"
                                          className="btn btn-fill-out submit font-weight-bold"
                                          name="submit"
                                          value="Submit"
                                        >
                                          Update Password
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                )}
                              </Formik>
                            </div>
                          </div>
                          {myPlan && myPlan.hasOwnProperty('name') && (<div className="card">
                            <div className="card-header">
                              <h5>My Plan</h5>
                            </div>
                            <div className="card-body">
                            <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                  <label>
                                    Current Plan{' '}
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    readOnly
                                    required
                                    className="form-control"
                                    name="current_plan"
                                    type="text"
                                    value={myPlan && myPlan.name}    
                                  />
                              </div>
                            </div>
                            <></>
                            <div className="col-md-3">
                              <button onClick={handleCancelPlan} className="cancel-plan-btn">
                                  Cancel Plan
                              </button>
                            </div>
                            <div className="col-md-4">
                              <button onClick={handleChangePlan} className="btn btn-fill-out submit font-weight-bold">
                                  Change Plan
                              </button>
                            </div>
                            </div>
                            
                            </div>
                          </div>)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </Protected>
    </>
  );
}

const mapStateToProps = (state) => ({
  orders: state.order,
  errors: state.errors,
  auth: state.auth,
  products: state.products
});

const mapDispatchToProps = {
  getOrders,
  Logout,
  UpdateAccount,
  DeleteAccount,
  ChangePassword,
  getMyPlan,
  cancelPlan
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
