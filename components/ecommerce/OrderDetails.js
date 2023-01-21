import { useState } from 'react';
import { connect } from 'react-redux';
import { currencyRate } from '../../constants';
import { useEffect } from 'react';
const OrderDetails = ({ items }) => {
  const [currency, setCurrency] = useState('XAF');

  useEffect(() => {
    if (localStorage.getItem('default_currency')) {
      setCurrency(localStorage.getItem('default_currency'));
    }
  }, []);
  return (
    <>
      <section className="mt-50 mb-50">
        <div className="container">
          <div className="row flex-row-reverse">
            <div className="col-xl-10 col-lg-12 m-auto">
              <div className="product-detail accordion-detail">
                <div className="row mb-50  mt-10">
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="detail-info">
                      <h4 className="mb-30">Order Details</h4>
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Product</th>
                              <th>Quantity</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {items &&
                              items.items.length > 0 &&
                              items.items.map((item, index) => (
                                <tr key={index + 1}>
                                  <td>#{index + 1}</td>
                                  <td>{item.name}</td>
                                  <td>{item.quantity}</td>
                                  {currency == 'XAF' ? (
                                    <td>
                                      {new Intl.NumberFormat().format(
                                        item.price?.toString()
                                      )}{' '}
                                      {currency}
                                    </td>
                                  ) : (
                                    <td>
                                      {'$'}
                                      {new Intl.NumberFormat().format(
                                        Math.ceil(
                                          item.price / currencyRate
                                        )?.toString()
                                      )}
                                    </td>
                                  )}
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
