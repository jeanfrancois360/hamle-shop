import Link from 'next/link';
import React from 'react';
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/action/cart';
import { addToCompare } from '../../redux/action/compareAction';
import { openQuickView } from '../../redux/action/quickViewAction';
import { addToWishlist } from '../../redux/action/wishlistAction';
import { numberWithCommas } from '../../util/util';
import { useState } from 'react';
import { useEffect } from 'react';
import { currencyRate } from '../../constants';

const SingleProduct = ({
  product,
  addToCart,
  addToCompare,
  addToWishlist,
  openQuickView,
}) => {
  const [currency, setCurrency] = useState('XAF');
  useEffect(() => {
    if (localStorage.getItem('default_currency')) {
      setCurrency(localStorage.getItem('default_currency'));
    }
  }, []);

  const handleCart = (product) => {
    addToCart(product);

    toast.success('Product added to Cart !', {
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

  const handleCompare = (product) => {
    addToCompare(product);
    toast('Added to Compare list !', {
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

  const handleWishlist = (product) => {
    addToWishlist(product);
    toast('Added to Wishlist !', {
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

  return (
    <>
      <div key={product.id} className="product-cart-wrap mb-30">
        <div className="product-img-action-wrap">
          <div className="product-img product-img-zoom">
            <Link href="/products/[id]" as={`/products/${product.id}`}>
              <a>
                <img
                  className="default-img"
                  src={'https://' + product.cover_image}
                  alt=""
                />
                <img
                  className="hover-img"
                  src={'https://' + product.cover_image}
                  alt=""
                />
              </a>
            </Link>
          </div>
          <div className="product-action-1">
            <a
              aria-label="Quick view"
              className="action-btn hover-up"
              data-bs-toggle="modal"
              onClick={(e) => openQuickView(product)}
            >
              <i className="fi-rs-eye"></i>
            </a>
            <a
              aria-label="Add To Wishlist"
              className="action-btn hover-up"
              onClick={(e) => handleWishlist(product)}
            >
              <i className="fi-rs-heart"></i>
            </a>
            <a
              aria-label="Compare"
              className="action-btn hover-up"
              onClick={(e) => handleCompare(product)}
            >
              <i className="fi-rs-shuffle"></i>
            </a>
          </div>

          <div className="product-badges product-badges-position product-badges-mrg">
            {/* {product.trending && <span className="hot">Hot</span>}
            {product.created && <span className="new">New</span>}
            {product.totalSell > 100 && <span className="best">Best Sell</span>}
            {product.discount.isActive && <span className="sale">Sale</span>}
            {product.discount.percentage >= 5 && (
              <span className="hot">{product.discount.percentage}%</span>
            )} */}
            <span className="new">New</span>
          </div>
        </div>
        <div className="product-content-wrap">
          <div className="product-category">
            <Link href="/products">
              <a>{product.category.name}</a>
            </Link>
          </div>
          <h2>
            <Link href="/products/[slug]" as={`/products/${product.slug}`}>
              <a>{product.name}</a>
            </Link>
          </h2>

          <div className="product-rate-cover">
            <div className="product-rate d-inline-block">
              <div className="product-rating" style={{ width: '90%' }}></div>
            </div>
            <span className="font-small ml-5 text-muted">
              {' '}
              {50}
              {/* ({product.ratingScore}) */}
            </span>
          </div>

          <div>
            <span className="font-small text-muted">
              By{' '}
              {/* <Link href="/vendor/1">
                <a>
                  {product.author.first_name + ' ' + product.author.last_name}
                </a>
              </Link> */}
            </span>
          </div>

          <div className="product-card-bottom">
            <div className="product-price">
              {currency == 'XAF' ? (
                <span>
                  {new Intl.NumberFormat().format(
                    product.unit_price?.toString()
                  )}{' '}
                  {currency}
                </span>
              ) : (
                <span>
                  {'$'}
                  {new Intl.NumberFormat().format(
                    Math.ceil(product.unit_price / currencyRate)?.toString()
                  )}
                </span>
              )}
              {/* <span className="old-price">
                {product.unit_price && `$ ${product.unit_price}`}
              </span> */}
            </div>
            <div className="add-cart">
              <a className="add" onClick={(e) => handleCart(product)}>
                <i className="fi-rs-shopping-cart mr-5"></i> Add
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = {
  addToCart,
  addToCompare,
  addToWishlist,
  openQuickView,
};

export default connect(null, mapDispatchToProps)(SingleProduct);
