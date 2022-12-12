import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ShowSelect from '../components/ecommerce/Filter/ShowSelect';
import SortSelect from '../components/ecommerce/Filter/SortSelect';
import Breadcrumb2 from '../components/layout/Breadcrumb2';
import CategoryProduct from './../components/ecommerce/Filter/CategoryProduct';
import PriceRangeSlider from './../components/ecommerce/Filter/PriceRangeSlider';
import SizeFilter from './../components/ecommerce/Filter/SizeFilter';
import VendorFilter from './../components/ecommerce/Filter/VendorFilter';
import Pagination from './../components/ecommerce/Pagination';
import QuickView from './../components/ecommerce/QuickView';
import SingleProduct from './../components/ecommerce/SingleProduct';
import Layout from './../components/layout/Layout';
import { getProducts, getCategories } from './../redux/action/product';

const Products = ({ products, getProducts, getCategories }) => {
  let Router = useRouter(),
    searchTerm = Router.query.search,
    showLimit = 12,
    showPagination = 4;

  const titlex = Router.query.cat;

  let [pagination, setPagination] = useState([]);
  let [limit, setLimit] = useState(showLimit);
  let [pages, setPages] = useState(Math.ceil(products.items.length / limit));
  let [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getCategories(10);
    getProducts(9);
  }, []);

  useEffect(() => {
    createPagination();
  }, [limit, pages, products.items.length]);

  const createPagination = () => {
    // set pagination
    let arr = new Array(Math.ceil(products.items.length / limit))
      .fill()
      .map((_, idx) => idx + 1);

    setPagination(arr);
    setPages(Math.ceil(products.items.length / limit));
  };

  const startIndex = currentPage * limit - limit;
  const endIndex = startIndex + limit;
  let getPaginatedProducts = [];
  if (titlex != undefined) {
    console.log('filtering...' + titlex);
    getPaginatedProducts = products.items
      .filter((product) => product.category.name == titlex)
      .slice(startIndex, endIndex);
  } else {
    console.log('not filtering...' + titlex);
    getPaginatedProducts = products.items.slice(startIndex, endIndex);
  }

  let start = Math.floor((currentPage - 1) / showPagination) * showPagination;
  let end = start + showPagination;
  const getPaginationGroup = pagination.slice(start, end);

  const next = () => {
    setCurrentPage((page) => page + 1);
  };

  const prev = () => {
    setCurrentPage((page) => page - 1);
  };

  const handleActive = (item) => {
    setCurrentPage(item);
  };

  const selectChange = (e) => {
    setLimit(Number(e.target.value));
    setCurrentPage(1);
    setPages(Math.ceil(products.items.length / Number(e.target.value)));
  };
  return (
    <>
      <Layout noBreadcrumb="d-none">
        <Breadcrumb2 />
        <section className="mt-50 mb-50">
          <div className="container mb-30">
            <div className="row flex-row-reverse">
              <div className="col-lg-4-5">
                <div className="shop-product-fillter">
                  <div className="totall-product">
                    <p>
                      We found
                      <strong className="text-brand">
                        {getPaginatedProducts.length}
                      </strong>
                      items for you!
                    </p>
                  </div>
                  <div className="sort-by-product-area">
                    <div className="sort-by-cover mr-10">
                      <ShowSelect
                        selectChange={selectChange}
                        showLimit={showLimit}
                      />
                    </div>
                    <div className="sort-by-cover">
                      <SortSelect />
                    </div>
                  </div>
                </div>
                <div className="row product-grid">
                  {getPaginatedProducts.length === 0 && (
                    <h3 class="text-center mt-20">No Products Found </h3>
                  )}

                  {getPaginatedProducts.map((item, i) => (
                    <div className="col-lg-4 col-md-4 col-12 col-sm-6" key={i}>
                      <SingleProduct product={item} />
                    </div>
                  ))}
                </div>
                {getPaginatedProducts.length > 0 && (
                  <div className="pagination-area mt-15 mb-sm-5 mb-lg-0">
                    <nav aria-label="Page navigation example">
                      <Pagination
                        getPaginationGroup={getPaginationGroup}
                        currentPage={currentPage}
                        pages={pages}
                        next={next}
                        prev={prev}
                        handleActive={handleActive}
                      />
                    </nav>
                  </div>
                )}
              </div>
              <div className="col-lg-1-5 primary-sidebar sticky-sidebar">
                <div className="sidebar-widget widget-category-2 mb-30">
                  <h5 className="section-title style-1 mb-30">Category</h5>
                  <CategoryProduct
                    products={products.items}
                    categories={products.categories}
                  />
                </div>

                {/* <div className="sidebar-widget price_range range mb-30">
                  <h5 className="section-title style-1 mb-30">Fill by price</h5>

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
                            {product.unit_price} XAF
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
        </section>
        <QuickView />
      </Layout>
    </>
  );
};

const mapStateToProps = (state) => ({
  products: state.products,
  productFilters: state.productFilters,
});

const mapDidpatchToProps = {
  getCategories,
  getProducts,
};

export default connect(mapStateToProps, mapDidpatchToProps)(Products);
