import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CategoryProduct2 from '../ecommerce/Filter/CategoryProduct2';
import CategoryProduct3 from '../ecommerce/Filter/CategoryProduct3';
import Search from '../ecommerce/Search';
import { Logout } from '../../redux/action/auth';
import { getCategories } from '../../redux/action/product';

const Header = ({
  totalCartItems,
  totalCompareItems,
  toggleClick,
  totalWishlistItems,
  user,
  isAuthenticated,
  token,
  Logout,
  getCategories,
  products,
}) => {
  const [isToggled, setToggled] = useState(false);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      const scrollCheck = window.scrollY >= 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    });
  });

  const handleLogout = (e) => {
    e.preventDefault();
    if (token) {
      Logout(token);
    }
  };

  useEffect(() => {
    getCategories(10);
  }, []);

  const handleToggle = () => setToggled(!isToggled);

  return (
    <>
      <header className="header-area header-style-1 header-height-2">
        <div className="mobile-promotion">
          <span>
            Grand opening, <strong>up to 15%</strong> off all items. Only{' '}
            <strong>3 days</strong> left
          </span>
        </div>
        <div className="header-top header-top-ptb-1 d-none d-lg-block">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-3 col-lg-4">
                <div className="header-info">
                  <ul>
                    <li>
                      <Link href="/account">
                        <a
                          onClick={() => localStorage.setItem('activeIndex', 5)}
                        >
                          My Account
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/wishlist">
                        <a>Wishlist</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/account">
                        <a
                          onClick={() => localStorage.setItem('activeIndex', 2)}
                        >
                          Order Tracking
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-6 col-lg-4">
                <div className="text-center">
                  <div id="news-flash" className="d-inline-block">
                    <ul>
                      <li>
                        Need help? Call Us:{' '}
                        <strong className="text-brand">
                          {' '}
                          +237 670 799 135
                        </strong>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* <div className="col-xl-3 col-lg-4">
                <div className="header-info header-info-right">
                  <ul>
                    <li>
                      <Link href="/#">
                        <a className="language-dropdown-active">
                          <i className="fi-rs-world"></i>
                          English
                          <i className="fi-rs-angle-small-down"></i>
                        </a>
                      </Link>
                      <ul className="language-dropdown">
                        <li>
                          <Link href="/#">
                            <a>
                              <img
                                src="/assets/imgs/theme/flag-fr.png"
                                alt=""
                              />
                              Français
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/#">
                            <a>
                              <img
                                src="/assets/imgs/theme/flag-dt.png"
                                alt=""
                              />
                              Deutsch
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/#">
                            <a>
                              <img
                                src="/assets/imgs/theme/flag-ru.png"
                                alt=""
                              />
                              Pусский
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a className="language-dropdown-active" href="#">
                        USD <i className="fi-rs-angle-small-down"></i>
                      </a>
                      <ul className="language-dropdown">
                        <li>
                          <a href="#">
                            <img src="/assets/imgs/theme/flag-fr.png" alt="" />
                            INR
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img src="/assets/imgs/theme/flag-dt.png" alt="" />
                            MBP
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img src="/assets/imgs/theme/flag-ru.png" alt="" />
                            EU
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="header-middle header-middle-ptb-1 d-none d-lg-block">
          <div className="container">
            <div className="header-wrap">
              <div className="logo logo-width-1">
                <Link href="/">
                  <a>
                    <img src="/assets/imgs/logos/hemle-logo.svg" alt="logo" />
                  </a>
                </Link>
              </div>
              <div className="header-right">
                <div className="search-style-2">
                  <Search categories={products.categories} />
                </div>
                <div className="header-action-right">
                  <div className="header-action-2">
                    <div className="search-location">
                      <form action="#">
                        <select className="select-active">
                          <option>Your Location</option>
                          <option>Alabama</option>
                          <option>Alaska</option>
                          <option>Arizona</option>
                          <option>Delaware</option>
                          <option>Florida</option>
                          <option>Georgia</option>
                          <option>Hawaii</option>
                          <option>Indiana</option>
                          <option>Maryland</option>
                          <option>Nevada</option>
                          <option>New Jersey</option>
                          <option>New Mexico</option>
                          <option>New York</option>
                        </select>
                      </form>
                    </div>
                    <div className="header-action-icon-2">
                      <Link href="/compare">
                        <a>
                          <img
                            className="svgInject"
                            alt="Evara"
                            src="/assets/imgs/theme/icons/icon-compare.svg"
                          />
                          <span className="pro-count blue">
                            {totalCompareItems}
                          </span>
                        </a>
                      </Link>
                      {/* <Link href='/compare'>
                        <a>
                          <span className='lable ml-0'>Compare</span>
                        </a>
                      </Link> */}
                    </div>
                    <div className="header-action-icon-2">
                      <Link href="/wishlist">
                        <a>
                          <img
                            className="svgInject"
                            alt="Evara"
                            src="/assets/imgs/theme/icons/icon-heart.svg"
                          />
                          <span className="pro-count blue">
                            {totalWishlistItems}
                          </span>
                        </a>
                      </Link>
                      {/* <Link href='/wishlist'>
                        <span className='lable'>Wishlist</span>
                      </Link> */}
                    </div>
                    <div className="header-action-icon-2">
                      <Link href="cart">
                        <a className="mini-cart-icon">
                          <img
                            alt="Evara"
                            src="/assets/imgs/theme/icons/icon-cart.svg"
                          />
                          <span className="pro-count blue">
                            {totalCartItems}
                          </span>
                        </a>
                      </Link>
                      {/* <Link href='cart'>
                        <a>
                          <span className='lable'>Cart</span>
                        </a>
                      </Link> */}
                    </div>
                    {isAuthenticated == false ? (
                      <div className="header-action-icon-2">
                        <button
                          onClick={() => window.location.replace('/login')}
                          className="submit submit-auto-width"
                        >
                          Login
                        </button>
                      </div>
                    ) : (
                      <div className="header-action-icon-2">
                        <Link href="/account">
                          <a>
                            <img
                              className="svgInject"
                              alt="Nest"
                              src="/assets/imgs/theme/icons/icon-user.svg"
                            />
                          </a>
                        </Link>
                        <Link href="/account">
                          <p>
                            <span className="lable ml-0">
                              {user.first_name} {user.last_name}
                            </span>
                          </p>
                        </Link>
                        <div className="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">
                          <ul>
                            <li>
                              <Link href="/account">
                                <a
                                  onClick={() =>
                                    localStorage.setItem('activeIndex', 5)
                                  }
                                >
                                  <i className="fi fi-rs-user mr-10"></i>
                                  My Account
                                </a>
                              </Link>
                            </li>
                            <li>
                              <Link href="/account">
                                <a
                                  onClick={() =>
                                    localStorage.setItem('activeIndex', 2)
                                  }
                                >
                                  <i className="fi fi-rs-shopping-bag mr-10"></i>
                                  My order
                                </a>
                              </Link>
                            </li>

                            <li>
                              <Link href="/wishlist">
                                <a>
                                  <i className="fi fi-rs-heart mr-10"></i>
                                  My Wishlist
                                </a>
                              </Link>
                            </li>
                            <li>
                              <Link href="/account">
                                <a>
                                  <i className="fi fi-rs-settings-sliders mr-10"></i>
                                  Setting
                                </a>
                              </Link>
                            </li>
                            <li>
                              <Link href="#">
                                <a onClick={(e) => handleLogout(e)}>
                                  <i className="fi fi-rs-sign-out mr-10"></i>
                                  Sign out
                                </a>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            scroll
              ? 'header-bottom header-bottom-bg-color sticky-bar stick'
              : 'header-bottom header-bottom-bg-color sticky-bar'
          }
        >
          <div className="container">
            <div className="header-wrap header-space-between position-relative">
              <div className="logo logo-width-1 d-block d-lg-none">
                <Link href="/">
                  <a>
                    <img src="/assets/imgs/logos/hemle-logo.svg" alt="logo" />
                  </a>
                </Link>
              </div>
              <div className="header-nav d-none d-lg-flex">
                <div className="main-categori-wrap d-none d-lg-block">
                  <a
                    className="categories-button-active"
                    onClick={handleToggle}
                  >
                    <span className="fi-rs-apps"></span>
                    <span className="et">Browse</span> All Categories
                    <i className="fi-rs-angle-down"></i>
                  </a>

                  <div
                    className={
                      isToggled
                        ? 'categories-dropdown-wrap categories-dropdown-active-large font-heading open'
                        : 'categories-dropdown-wrap categories-dropdown-active-large font-heading'
                    }
                  >
                    <div className="d-flex categori-dropdown-inner">
                      <CategoryProduct2
                        categories={products.categories.slice(0, 3)}
                      />
                      <CategoryProduct3
                        categories={products.categories.slice(3, 6)}
                      />
                    </div>
                    <div
                      className="more_slide_open"
                      style={{ display: 'none' }}
                    >
                      <div className="d-flex categori-dropdown-inner">
                        <ul>
                          <li>
                            <Link href="/products">
                              <a>
                                {' '}
                                <img
                                  src="/assets/imgs/theme/icons/icon-1.svg"
                                  alt=""
                                />
                                Milks and Dairies
                              </a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/products">
                              <a>
                                {' '}
                                <img
                                  src="/assets/imgs/theme/icons/icon-2.svg"
                                  alt=""
                                />
                                Clothing & beauty
                              </a>
                            </Link>
                          </li>
                        </ul>
                        <ul className="end">
                          <li>
                            <Link href="/products">
                              <a>
                                {' '}
                                <img
                                  src="/assets/imgs/theme/icons/icon-3.svg"
                                  alt=""
                                />
                                Wines & Drinks
                              </a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/products">
                              <a>
                                {' '}
                                <img
                                  src="/assets/imgs/theme/icons/icon-4.svg"
                                  alt=""
                                />
                                Fresh Seafood
                              </a>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="more_categories">
                      <span className="icon"></span>{' '}
                      <span className="heading-sm-1">Show more...</span>
                    </div>
                  </div>
                </div>
                <div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block  font-heading">
                  <nav>
                    <ul>
                      <li className="hot-deals">
                        <img
                          src="/assets/imgs/theme/icons/icon-hot.svg"
                          alt="hot deals"
                        />
                        <Link href="/products">
                          <a>Hot Deals</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/">
                          <a>Home</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/about">
                          <a>About</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/membership">
                          <a>Membership</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products">
                          <a>Shop</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="cart">
                          <a>Cart</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/wishlist">
                          <a>Wishlist</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact">
                          <a>Contact</a>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              {/* <div className='hotline d-none d-lg-flex'>
                <img
                  src='/assets/imgs/theme/icons/icon-headphone.svg'
                  alt='hotline'
                />

                <p>
                  1900 - 888<span>24/7 Support Center</span>
                </p>
              </div> */}
              <div className="header-action-icon-2 d-block d-lg-none">
                <div
                  className="burger-icon burger-icon-white"
                  onClick={toggleClick}
                >
                  <span className="burger-icon-top"></span>
                  <span className="burger-icon-mid"></span>
                  <span className="burger-icon-bottom"></span>
                </div>
              </div>

              <div className="header-action-right d-block d-lg-none">
                <div className="header-action-2">
                  <div className="header-action-icon-2">
                    <Link href="/wishlist">
                      <a>
                        <img
                          alt="Evara"
                          src="/assets/imgs/theme/icons/icon-heart.svg"
                        />
                        <span className="pro-count white">
                          {totalWishlistItems}
                        </span>
                      </a>
                    </Link>
                  </div>
                  <div className="header-action-icon-2">
                    <Link href="cart">
                      <a className="mini-cart-icon">
                        <img
                          alt="Evara"
                          src="/assets/imgs/theme/icons/icon-cart.svg"
                        />
                        <span className="pro-count white">
                          {totalCartItems}
                        </span>
                      </a>
                    </Link>
                    <div className="cart-dropdown-wrap cart-dropdown-hm2">
                      <ul>
                        <li>
                          <div className="shopping-cart-img">
                            <Link href="/products">
                              <a>
                                <img
                                  alt="Evara"
                                  src="/assets/imgs/shop/thumbnail-3.jpg"
                                />
                              </a>
                            </Link>
                          </div>
                          <div className="shopping-cart-title">
                            <h4>
                              <Link href="/products">
                                <a>Plain Striola Shirts</a>
                              </Link>
                            </h4>
                            <h3>
                              <span>1 × </span>
                              $800.00
                            </h3>
                          </div>
                          <div className="shopping-cart-delete">
                            <Link href="/#">
                              <a>
                                <i className="fi-rs-cross-small"></i>
                              </a>
                            </Link>
                          </div>
                        </li>
                        <li>
                          <div className="shopping-cart-img">
                            <Link href="/products">
                              <a>
                                <img
                                  alt="Evara"
                                  src="/assets/imgs/shop/thumbnail-4.jpg"
                                />
                              </a>
                            </Link>
                          </div>
                          <div className="shopping-cart-title">
                            <h4>
                              <Link href="/products">
                                <a>Macbook Pro 2022</a>
                              </Link>
                            </h4>
                            <h3>
                              <span>1 × </span>
                              $3500.00
                            </h3>
                          </div>
                          <div className="shopping-cart-delete">
                            <Link href="/#">
                              <a>
                                <i className="fi-rs-cross-small"></i>
                              </a>
                            </Link>
                          </div>
                        </li>
                      </ul>
                      <div className="shopping-cart-footer">
                        <div className="shopping-cart-total">
                          <h4>
                            Total
                            <span>$383.00</span>
                          </h4>
                        </div>
                        <div className="shopping-cart-button">
                          <Link href="cart">
                            <a>View cart</a>
                          </Link>
                          <Link href="/checkout">
                            <a>Checkout</a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

const mapStateToProps = (state) => ({
  products: state.products,
  totalCartItems: state.cart.length,
  totalCompareItems: state.compare.items.length,
  totalWishlistItems: state.wishlist.items.length,
});

const mapDidpatchToProps = {
  getCategories,
  Logout,
};

export default connect(mapStateToProps, mapDidpatchToProps)(Header);
