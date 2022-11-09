import React from 'react';
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import ProductDetails from '../../components/ecommerce/ProductDetails';
import Layout from '../../components/layout/Layout';
import { server } from '../../config/index';
import { findProductIndex } from '../../util/util';

const ProductId = ({ product }) => {
  return (
    <>
      <Layout parent="Home" sub="Shop" subChild={product.title}>
        <div className="container">
          <ProductDetails product={product} />
        </div>
      </Layout>
    </>
  );
};

ProductId.getInitialProps = async (params) => {
  const request = await fetch(`${server}/static/product.json`);
  const data = await request.json();

  const index = findProductIndex(data, params.query.slug);
  // console.log(params);

  return { product: data[index] };
};

export default ProductId;
