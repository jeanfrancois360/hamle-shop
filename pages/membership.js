import Layout from '../components/layout/Layout';

function MemberShip() {
  return (
    <>
      <Layout parent="Home" sub="Pages" subChild="About">
        <div className="container  pt-50">
          <div className="row">
            <div className="col-xl-10 col-lg-12 m-auto">
              <section className="text-center mb-50">
                <h2 className="title style-3 mb-40">Become a member</h2>
                <div className="row">
                  <div className="col-lg-4 col-md-6 mb-24">
                    <div className="featured-card">
                      <img src="/assets/imgs/theme/icons/icon-1.svg" alt="" />
                      <h4>Baby Plan</h4>
                      <p>
                        There are m any variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in
                        some form
                      </p>
                      <a href="#">Subscribe Now</a>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-24">
                    <div className="featured-card">
                      <img src="/assets/imgs/theme/icons/icon-2.svg" alt="" />
                      <h4>Master Plan</h4>
                      <p>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in
                        some form
                      </p>
                      <a href="#">Subscribe Now</a>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-24">
                    <div className="featured-card">
                      <img src="/assets/imgs/theme/icons/icon-3.svg" alt="" />
                      <h4>Premium Plan</h4>
                      <p>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in
                        some form
                      </p>
                      <a href="#">Subscribe Now</a>
                    </div>
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

export default MemberShip;
