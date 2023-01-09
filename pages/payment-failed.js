import { connect } from 'react-redux';
import Layout from '../components/layout/Layout';
import { BsFillBagXFill } from 'react-icons/bs';
import Link from 'next/link';

function PaymentSucceeded() {
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
                      <BsFillBagXFill color="#E91E62" size="60" />
                      <h3 className="mt-3">Payment Failed!</h3>
                      <p className="mt-2">Please try again later!</p>
                    </div>
                    <Link href="/checkout">
                      <a className="btn">Checkout</a>
                    </Link>
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

const mapDidpatchToProps = {};

export default connect(mapStateToProps, mapDidpatchToProps)(PaymentSucceeded);
