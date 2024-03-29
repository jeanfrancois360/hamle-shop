/* eslint-disable no-prototype-builtins */
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Layout from '../components/layout/Layout';
import { getPlans, getMyPlan } from '../redux/action/product';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { currencyRate } from '../constants';

function MemberShip({ getPlans, products, getMyPlan, errors }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [myPlan, setMyPlan] = useState('');
  const [currency, setCurrency] = useState('XAF');
  const router = useRouter();

  useEffect(() => {
    getPlans();
    if (localStorage.getItem('isAuthenticated')) {
      setIsAuthenticated(localStorage.getItem('isAuthenticated'));
    }
    if (localStorage.getItem('default_currency')) {
      setCurrency(localStorage.getItem('default_currency'));
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getMyPlan();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (products.plan) {
      setMyPlan(products.plan);
    }
  }, [products]);

  const handlePlan = (payload) => {
    localStorage.setItem('order-type', 'subscription');
    localStorage.setItem('plan-details', JSON.stringify(payload));
    router.push({
      pathname: '/checkout',
    });
  };

  useEffect(() => {
    if (myPlan) {
      console.log({ myPlan });
    }
  }, [myPlan]);

  return (
    <>
      <Layout parent="Home" sub="Pages" subChild="About">
        <div className="container  pt-50">
          <div className="row">
            <div className="col-xl-10 col-lg-12 m-auto">
              <section className="text-center mb-50">
                <h2 className="title style-3 mb-40">Become a member</h2>
                <div className="row">
                  {products &&
                    products.plans.length > 0 &&
                    products.plans.map((plan) => (
                      <div key={plan.id} className="col-lg-3 col-md-6 mb-24">
                        <div className="featured-card">
                          <img src={plan.url} alt="" width={100} />
                          <h4>{plan.name.toUpperCase()}</h4>
                          {currency == 'XAF' ? (
                            <h5>
                              {new Intl.NumberFormat().format(
                                plan.price?.toString()
                              )}{' '}
                              {currency}
                            </h5>
                          ) : (
                            <h5>
                              {'$'}
                              {new Intl.NumberFormat().format(
                                Math.ceil(plan.price / currencyRate)?.toString()
                              )}
                            </h5>
                          )}

                          <p>{plan.description}</p>
                          <button
                            disabled={
                              myPlan && myPlan.name == plan.name ? true : false
                            }
                            onClick={() => handlePlan(plan)}
                            className="btn  btn-md"
                          >
                            {myPlan && myPlan.name == plan.name
                              ? 'Current'
                              : myPlan && !myPlan.hasOwnProperty('name')
                              ? 'Subscribe Now'
                              : 'Change Now'}
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
const mapStateToProps = (state) => ({
  products: state.products,
  productFilters: state.productFilters,
  errors: state.errors,
});

const mapDidpatchToProps = {
  getPlans,
  getMyPlan,
};

export default connect(mapStateToProps, mapDidpatchToProps)(MemberShip);
