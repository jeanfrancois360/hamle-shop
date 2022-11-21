import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import ProductDetails from '../../components/ecommerce/ProductDetails';
import Layout from '../../components/layout/Layout';
import { server } from '../../config/index';
import { getProduct } from '../../redux/action/product';
import { findProductIndex } from '../../util/util';

const ProductId = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { item } = useSelector((state) => state.products);
  const [product, setProduct] = useState();
  useEffect(() => {
    dispatch(getProduct(id));
  }, [id]);

  useEffect(() => {
    if (item) {
      setProduct(item[0]);
    }
  }, [item]);

  return (
    <>
      {product && (
        <Layout parent="Home" sub="Shop" subChild={product.name}>
          <div className="container">
            <ProductDetails product={product} />
          </div>
        </Layout>
      )}
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

export default ProductId;
