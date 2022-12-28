import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Layout from '../components/layout/Layout';
import {
  clearCart,
  closeCart,
  decreaseQuantity,
  deleteFromCart,
  increaseQuantity,
  openCart,
} from '../redux/action/cart';
import { addOrder } from '../redux/action/order';
import { useState } from 'react';
import { useEffect } from 'react';
import { MsgText } from '../components/elements/MsgText';

const Cart = ({ cartItems, addOrder, errors, order }) => {
  let initialValues = {
    shipping_full_name: '',
    shipping_address: '',
    shipping_city: '',
    shipping_state: '',
    shipping_zip_code: '',
    shipping_phone: '',
  };

  const price = () => {
    let price = 0;
    cartItems.forEach((item) => (price += item.unit_price * item.qty));
    return price;
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('isAuthenticated')) {
      setIsAuthenticated(localStorage.getItem('isAuthenticated'));
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  useEffect(() => {
    if (user) {
      setFormValues({
        shipping_full_name: user.first_name + ' ' + user.last_name,
        shipping_address: '',
        shipping_city: user.city,
        shipping_state: '',
        shipping_zip_code: user.zip_code ?? '00000',
        shipping_phone: user.phone,
      });
    }
  }, [user]);

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
  const FormValidationSchema = Yup.object().shape({
    shipping_full_name: Yup.string().trim().required().label('Full name'),
    shipping_address: Yup.string().trim().required().label('Address'),
    shipping_city: Yup.string().trim().required().label('City'),
    shipping_state: Yup.string().trim().required().label('State'),
    shipping_zip_code: Yup.string().trim().required().label('Zip Code'),
    shipping_phone: Yup.string().trim().required().label('Phone'),
  });

  const handleOrder = (payload) => {
    const orderItems = [];
    let total = 0;
    cartItems.map((item) => {
      let newObj = {};
      newObj['id'] = item.id;
      newObj['quantity'] = item.qty;
      newObj['name'] = item.name;
      newObj['price'] = parseInt(item.unit_price);
      newObj['total'] = item.qty * parseInt(item.unit_price);

      total += item.qty * parseInt(item.unit_price);
      orderItems.push(newObj);
    });
    let data = {
      ...payload,
      product_items: orderItems,
      price: total,
      state: 'pending',
      payment_method_id: 3,
    };
    addOrder(data);
  };

  return (
    <>
      <Layout parent="Home" sub="Shop" subChild="Checkout">
        <section className="mt-50 mb-50">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mb-40">
                <h1 className="heading-2 mb-10">Checkout</h1>
                <div className="d-flex justify-content-between">
                  <h6 className="text-body">
                    There are{' '}
                    <span className="text-brand">{cartItems.length}</span>{' '}
                    products in your cart
                  </h6>
                </div>
              </div>
            </div>
            <Formik
              enableReinitialize
              initialValues={formValues}
              onSubmit={handleOrder}
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
                    <div className="col-lg-7">
                      {!isAuthenticated && (
                        <div className="row mb-50">
                          <div className="col-lg-7 mb-sm-15 mb-lg-0 mb-md-3">
                            <div className="toggle_info">
                              <span>
                                <i className="fi-rs-user mr-10"></i>
                                <span className="text-muted font-lg">
                                  Already have an account?
                                </span>{' '}
                                <a
                                  href="login"
                                  onClick={() => {
                                    localStorage.setItem(
                                      'prev_page',
                                      'checkout'
                                    );
                                  }}
                                  data-bs-toggle="collapse"
                                  className="collapsed font-lg"
                                  aria-expanded="false"
                                >
                                  Click here to login
                                </a>
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="mb-25">
                        <h4>Billing Details</h4>
                      </div>

                      <div className="form-group">
                        <input
                          type="text"
                          required=""
                          name="shipping_full_name"
                          placeholder="Full name *"
                          value={values.shipping_full_name}
                          onChange={handleChange('shipping_full_name')}
                          onBlur={handleBlur('shipping_full_name')}
                          autoComplete={`${true}`}
                        />
                      </div>
                      {touched.shipping_full_name &&
                        errors.shipping_full_name && (
                          <MsgText
                            text={errors.shipping_full_name}
                            textColor="danger"
                          />
                        )}

                      <div className="form-group">
                        <input
                          type="text"
                          name="shipping_address"
                          required=""
                          placeholder="Address *"
                          value={values.shipping_address}
                          onChange={handleChange('shipping_address')}
                          onBlur={handleBlur('shipping_address')}
                          autoComplete={`${true}`}
                        />
                      </div>
                      {touched.shipping_address && errors.shipping_address && (
                        <MsgText
                          text={errors.shipping_address}
                          textColor="danger"
                        />
                      )}

                      <div className="form-group">
                        <input
                          required=""
                          type="text"
                          name="shipping_city"
                          placeholder="City / Town *"
                          value={values.shipping_city}
                          onChange={handleChange('shipping_city')}
                          onBlur={handleBlur('shipping_city')}
                          autoComplete={`${true}`}
                        />
                      </div>
                      {touched.shipping_city && errors.shipping_city && (
                        <MsgText
                          text={errors.shipping_city}
                          textColor="danger"
                        />
                      )}

                      <div className="form-group">
                        <input
                          required=""
                          type="text"
                          name="shipping_state"
                          placeholder="State"
                          value={values.shipping_state}
                          onChange={handleChange('shipping_state')}
                          onBlur={handleBlur('shipping_state')}
                          autoComplete={`${true}`}
                        />
                      </div>
                      {touched.shipping_state && errors.shipping_state && (
                        <MsgText
                          text={errors.shipping_state}
                          textColor="danger"
                        />
                      )}

                      <div className="form-group">
                        <input
                          required=""
                          type="text"
                          name="shipping_zip_code"
                          placeholder="Postcode / ZIP *"
                          value={values.shipping_zip_code}
                          onChange={handleChange('shipping_zip_code')}
                          onBlur={handleBlur('shipping_zip_code')}
                          autoComplete={`${true}`}
                        />
                      </div>
                      {touched.shipping_zip_code &&
                        errors.shipping_zip_code && (
                          <MsgText
                            text={errors.shipping_zip_code}
                            textColor="danger"
                          />
                        )}

                      <div className="form-group">
                        <input
                          required=""
                          type="text"
                          name="shipping_phone"
                          placeholder="Phone *"
                          value={values.shipping_phone}
                          onChange={handleChange('shipping_phone')}
                          onBlur={handleBlur('shipping_phone')}
                          autoComplete={`${true}`}
                        />
                      </div>
                      {touched.shipping_phone && errors.shipping_phone && (
                        <MsgText
                          text={errors.shipping_phone}
                          textColor="danger"
                        />
                      )}

                      <div className="form-group mb-30">
                        <textarea rows="5" placeholder="Order notes"></textarea>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="border p-40 cart-totals ml-30 mb-50">
                        <div className="d-flex align-items-end justify-content-between mb-30">
                          <h4>Your Order</h4>
                          <h6 className="text-muted">Subtotal</h6>
                        </div>
                        <div className="divider-2 mb-30"></div>
                        <div className="table-responsive order_table">
                          {cartItems.length <= 0 && 'No Products'}
                          <table
                            className={
                              cartItems.length > 0
                                ? 'table no-border'
                                : 'd-none'
                            }
                          >
                            <tbody>
                              {cartItems.map((item, i) => (
                                <tr key={i}>
                                  <td className="image product-thumbnail">
                                    <img src={'https://' + item.cover_image} />
                                  </td>
                                  <td>
                                    <h6 className="w-160 mb-5">
                                      <a>{item.title}</a>
                                      <div className="product-rate-cover">
                                        <div className="product-rate d-inline-block">
                                          <div
                                            className="product-rating"
                                            style={{
                                              width: '90%',
                                            }}
                                          ></div>
                                        </div>
                                        <span className="font-small ml-5 text-muted">
                                          {' '}
                                          (4.0)
                                        </span>
                                      </div>
                                    </h6>{' '}
                                  </td>
                                  <td>
                                    <h6 className="text-muted pl-20 pr-20">
                                      x {item.qty}
                                    </h6>
                                  </td>
                                  <td>
                                    <h4 className="text-brand">
                                      {new Intl.NumberFormat().format(
                                        (
                                          item.qty * parseInt(item.unit_price)
                                        )?.toString()
                                      )}{' '}
                                      XAF
                                    </h4>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <hr />
                        <div className="price text-center">
                          <h4 className="mt-4">
                            Total:{' '}
                            <span className="text-brand">
                              {new Intl.NumberFormat().format(
                                price()?.toString()
                              )}{' '}
                              XAF
                            </span>
                          </h4>
                        </div>
                        <hr />
                        <div className="bt-1 border-color-1 mt-30 mb-30"></div>
                        <div className="payment_method">
                          <div className="mb-25">
                            <h5>Payment</h5>
                          </div>
                          <div className="payment_option">
                            <div className="custome-radio">
                              <input
                                className="form-check-input"
                                required=""
                                type="radio"
                                name="payment_option"
                                id="exampleRadios4"
                                defaultChecked={true}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="exampleRadios4"
                                data-bs-toggle="collapse"
                                data-target="#mobileMoney"
                                aria-controls="mobileMoney"
                              >
                                Mobile money
                              </label>
                              <div
                                className="form-group collapse in"
                                id="checkPayment"
                              >
                                <p className="text-muted mt-5">
                                  Pay via mobile money, you can pay using your
                                  mobile money account{' '}
                                </p>
                              </div>
                            </div>
                            <div className="custome-radio">
                              <input
                                className="form-check-input"
                                required=""
                                type="radio"
                                name="payment_option"
                                id="exampleRadios5"
                                defaultChecked={true}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="exampleRadios5"
                                data-bs-toggle="collapse"
                                data-target="#stripe"
                                aria-controls="stripe"
                              >
                                Stripe
                              </label>
                              <div
                                className="form-group collapse in"
                                id="stripe"
                              >
                                <p className="text-muted mt-5">
                                  Pay via Stripe; you can pay with your credit
                                  card.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group col-lg-12 mt-30">
                          <button type="submit" className="btn  btn-md">
                            Place Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </section>
      </Layout>
    </>
  );
};

const mapStateToProps = (state) => ({
  order: state.order,
  cartItems: state.cart,
  activeCart: state.counter,
  errors: state.errors,
  loader: state.loader,
});

const mapDispatchToProps = {
  closeCart,
  increaseQuantity,
  decreaseQuantity,
  deleteFromCart,
  openCart,
  clearCart,
  addOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);