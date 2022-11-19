import React from 'react';
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
const Banner5 = () => {
  return (
    <>
      <div className="col-lg-4 col-md-6">
        <div
          className="banner-img wow animate__animated animate__fadeInUp"
          data-wow-delay="0"
        >
          <img src="/assets/imgs/banner/small-banner.png" alt="" />
          <div className="banner-text">
            <h4>
              The best Shoes <br />
              Online
            </h4>
            <Link href="/products">
              <a className="btn btn-xs">
                Shop Now <i className="fi-rs-arrow-small-right"></i>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6">
        <div
          className="banner-img wow animate__animated animate__fadeInUp"
          data-wow-delay=".2s"
        >
          <img src="/assets/imgs/banner/small-banner.png" alt="" />
          <div className="banner-text">
            <h4>
              The best Shoes <br />
              Online
            </h4>
            <Link href="/products">
              <a className="btn btn-xs">
                Shop Now <i className="fi-rs-arrow-small-right"></i>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="col-lg-4 d-md-none d-lg-flex">
        <div
          className="banner-img mb-sm-0 wow animate__animated animate__fadeInUp"
          data-wow-delay=".4s"
        >
          <img src="/assets/imgs/banner/small-banner.png" alt="" />
          <div className="banner-text">
            <h4>
              The best Shoes <br />
              Online
            </h4>
            <Link href="/products">
              <a className="btn btn-xs">
                Shop Now <i className="fi-rs-arrow-small-right"></i>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner5;
