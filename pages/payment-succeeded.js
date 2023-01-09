import { connect } from 'react-redux';
import Layout from '../components/layout/Layout';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { useEffect } from 'react';
import { useState } from 'react';
import { planSubscription, changePlan } from '../redux/action/product';

function PaymentSucceeded({ planSubscription, changePlan }) {
  const [orderType, setOrderType] = useState('');
  const [planDetails, setPlanDetails] = useState('');
  const [myPlan, setMyPlan] = useState('');

  useEffect(() => {
    if (localStorage.getItem('order-type')) {
      setOrderType(localStorage.getItem('order-type'));
      setPlanDetails(JSON.parse(localStorage.getItem('plan-details')));
      setMyPlan(JSON.parse(localStorage.getItem('my-plan')));
    }
  }, []);

  useEffect(() => {
    if (orderType && orderType == 'subscription') {
      handleSubscription();
    } else {
      localStorage.removeItem('order-details');
      localStorage.removeItem('order-type');
      localStorage.removeItem('hemle_cart');
    }
  }, [orderType]);

  const handleSubscription = () => {
    if (planDetails) {
      if (!myPlan) {
        planSubscription({ plan_id: planDetails.id });
      } else {
        changePlan({ plan_id: planDetails.id });
      }
    }
  };

  return (
    <>
      <Layout parent="Home" sub="Pages" subChild="About">
        <div className="container pt-50">
          <div className="row">
            <div className="col-xl-10 col-lg-12 m-auto">
              <section className="text-center mb-50">
                <div className="col-lg-6 col-md-6 mb-24 m-auto">
                  <div className="featured-card pt-1">
                    <div className="mt-4">
                      <BsFillBagCheckFill color="#8AC53F" size="60" />
                      <h3 className="mt-3">Congratulations!</h3>
                      <p className="mt-2">
                        Your order is successfully processed now!
                      </p>
                    </div>
                    <a href="products" className="btn">
                      <i className="fi-rs-shopping-bag mr-10"></i>
                      Continue Shopping
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
const mapStateToProps = (state) => ({});

const mapDidpatchToProps = {
  planSubscription,
  changePlan,
};

export default connect(mapStateToProps, mapDidpatchToProps)(PaymentSucceeded);
