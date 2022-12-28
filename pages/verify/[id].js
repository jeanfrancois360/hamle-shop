import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { VerifyAccount } from '../../redux/action/auth';
import { toast } from 'react-toastify';

const ProductId = ({ VerifyAccount, errors, auth }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { item } = useSelector((state) => state.products);
  const [product, setProduct] = useState();
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const notify = (msg_type) => {
    if (msg_type === 'success')
      toast.success(successMsg, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    if (msg_type === 'error')
      toast.error(errorMsg, {
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

  useEffect(() => {
    if (errors.error_msg != '') {
      setErrorMsg(errors.error_msg);
    }
  }, [errors]);

  useEffect(() => {
    if (auth.message != '') {
      setSuccessMsg(auth.message);
    }
  }, [auth]);

  useEffect(() => {
    if (errorMsg) {
      //   notify('error');
      router.push({
        pathname: '/login',
      });
    }
  }, [errorMsg]);

  useEffect(() => {
    if (successMsg) {
      console.log('success');
      //   notify('success');
    }
  }, [successMsg]);
  useEffect(() => {
    if (id) {
      VerifyAccount(id);
    }
  }, [id]);

  return (
    <>
      <div className="row mt-90">
        <div className="col-lg-4 col-md-6 m-auto">
          <div className="featured-card text-center">
            <img
              className="verify-loader"
              src="/assets/imgs/theme/Loading_icon.gif"
              alt=""
            />
            <h4>Verifying...</h4>
          </div>
        </div>
      </div>
    </>
  );
};

// ProductId.getInitialProps = async (params) => {
//   console.log('Called');
//   const request = await fetch(`${server}/static/product.json`);
//   const data = await request.json();

//   const index = findProductIndex(data, params.query.id);
//   // console.log(params);

//   return { product: data[index] };
// };
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  loader: state.loader,
});

const mapDispatchToProps = {
  VerifyAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductId);
