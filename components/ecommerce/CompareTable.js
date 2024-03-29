import Link from 'next/link';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/action/cart';
import { useState } from 'react';
import { useEffect } from 'react';
import { currencyRate } from '../../constants';
const CompareTable = ({ data, features, deleteFromCompare, addToCart }) => {
  const [currency, setCurrency] = useState('XAF');

  useEffect(() => {
    if (localStorage.getItem('default_currency')) {
      setCurrency(localStorage.getItem('default_currency'));
    }
  }, []);
  const handleCart = (product) => {
    addToCart(product);
    toast('Product added to Cart !');
  };
  return (
    <table className="table text-center">
      <tbody>
        {features.map((feature) => (
          <tr key={feature}>
            <th
              className="text-muted font-md fw-600"
              style={{ textTransform: 'capitalize' }}
            >
              {feature}
            </th>
            {data.map((product) =>
              feature == 'preview' ? (
                <td className="row_img">
                  <img src={'https://' + product.cover_image} />
                </td>
              ) : feature == 'name' ? (
                <td className="product_name">
                  <h5>
                    <a href="#">{product.name}</a>
                  </h5>
                </td>
              ) : feature == 'price' ? (
                <td className="product_price">
                  <span className="price">
                    {currency == 'XAF' ? (
                      <h3 className="text-brand">
                        {new Intl.NumberFormat().format(
                          product.unit_price?.toString()
                        )}{' '}
                        {currency}
                      </h3>
                    ) : (
                      <h3 className="text-brand">
                        {'$'}
                        {new Intl.NumberFormat().format(
                          Math.ceil(
                            product.unit_price / currencyRate
                          )?.toString()
                        )}
                      </h3>
                    )}
                  </span>
                </td>
              ) : feature == 'description' ? (
                <td className="row_text font-xs">
                  <p>{product.description}</p>
                </td>
              ) : feature == 'stock' ? (
                <td className="row_stock">
                  {product.quantity >= 0 ? (
                    <span>In Stock</span>
                  ) : (
                    <span className="text-danger font-weight-bold">
                      Out of stock
                    </span>
                  )}
                </td>
              ) : feature == 'buy' ? (
                <td className="row_btn">
                  {product.quantity >= 0 ? (
                    <button
                      className="btn  btn-sm"
                      onClick={() => handleCart(product)}
                    >
                      <i className="fi-rs-shopping-bag mr-5"></i>
                      Add to cart
                    </button>
                  ) : (
                    <Link href="/contact">
                      <button className="btn  btn-sm btn-secondary">
                        <i className="fi-rs-headset mr-5"></i>
                        Contact Us
                      </button>
                    </Link>
                  )}
                </td>
              ) : feature == ' ' ? (
                <td className="row_remove">
                  <a onClick={() => deleteFromCompare(product.id)}>
                    <i className="fi-rs-trash mr-5"></i>
                    <span>Remove</span>
                  </a>
                </td>
              ) : null
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const mapDispatchToProps = {
  addToCart,
};

export default connect(null, mapDispatchToProps)(CompareTable);
