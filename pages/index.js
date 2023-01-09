import CategoryTab from '../components/ecommerce/categoryTab';
import FeatchDeals from '../components/ecommerce/fetchDeals';
import Layout from '../components/layout/Layout';
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import CategoryProduct from '../components/ecommerce/Filter/CategoryProduct';
import PriceRangeSlider from '../components/ecommerce/Filter/PriceRangeSlider';
import SizeFilter from '../components/ecommerce/Filter/SizeFilter';
import VendorFilter from '../components/ecommerce/Filter/VendorFilter';
import Banner5 from '../components/elements/Banner5';
import Bottom from '../components/elements/Bottom';
import IntroPopup from '../components/elements/IntroPopup';
import CategorySlider2 from '../components/sliders/Category2';
import Intro2 from '../components/sliders/Intro2';
import Link from 'next/link';
import { connect } from 'react-redux';
import QuickView from '../components/ecommerce/QuickView';
import { getProducts, getCategories } from '../redux/action/product';
import { useEffect } from 'react';

function Home({ products, getProducts, getCategories }) {
  useEffect(() => {
    getCategories(10);
    getProducts(9);
  }, []);

  return (
    <>
      {/* <IntroPopup /> */}
      <Layout noBreadcrumb="d-none" headerStyle="header-style-1">
        <div className="container mb-30">
          <div className="row flex-row-reverse">
            <div className="col-lg-4-5">
              <section className="home-slider position-relative mb-30">
                <div className="home-slide-cover mt-30">
                  <Intro2 />
                </div>
              </section>

              <section className="product-tabs section-padding position-relative">
                <CategoryTab
                  products={products.items}
                  categories={products.categories}
                />
              </section>

              <section className="banners mb-15">
                <div className="container">
                  <div className="row">
                    <Banner5 />
                  </div>
                </div>
              </section>
            </div>
            <div className="col-lg-1-5 primary-sidebar sticky-sidebar pt-30">
              <div className="sidebar-widget widget-category-2 mb-30">
                <h5 className="section-title style-1 mb-30">Category</h5>
                <CategoryProduct
                  products={products.items}
                  categories={products.categories}
                />
              </div>

              {/* <div className="sidebar-widget price_range range mb-30">
                <h5 className="section-title style-1 mb-30">Fill by price</h5>
                <div className="bt-1 border-color-1"></div>

                <div className="price-filter">
                  <div className="price-filter-inner">
                    <br />
                    <PriceRangeSlider />

                    <br />
                  </div>
                </div>

                <div className="list-group">
                  <div className="list-group-item mb-10 mt-10">
                    <label className="fw-900">Color</label>
                    <VendorFilter />
                    <label className="fw-900 mt-15">Item Condition</label>
                    <SizeFilter />
                  </div>
                </div>
                <br />
              </div> */}

              <div className="sidebar-widget product-sidebar  mb-30 p-30 bg-grey border-radius-10">
                <h5 className="section-title style-1 mb-30">New products</h5>
                <div className="bt-1 border-color-1"></div>

                {products &&
                  products.items.length > 0 &&
                  products.items.slice(0, 3).map((product, index) => (
                    <div key={index} className="single-post clearfix">
                      <div className="image">
                        <img src={'https://' + product.cover_image} alt="#" />
                      </div>
                      <div className="content pt-10">
                        <h6>
                          <a>{product.name}</a>
                        </h6>
                        <p className="price mb-0 mt-5">
                          {new Intl.NumberFormat().format(
                            product.unit_price?.toString()
                          )}{' '}
                          XAF
                        </p>
                        <div className="product-rate">
                          <div
                            className="product-rating"
                            style={{ width: '90%' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <QuickView />
      </Layout>
    </>
  );
}

const mapStateToProps = (state) => ({
  products: state.products,
  productFilters: state.productFilters,
});

const mapDidpatchToProps = {
  getCategories,
  getProducts,
};
export default connect(mapStateToProps, mapDidpatchToProps)(Home);
