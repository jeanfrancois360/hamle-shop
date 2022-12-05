import React, { useEffect, useState } from 'react';
import { server } from '../../config/index';
import Cat1Tab from '../elements/FeaturedTab';
import Cat2Tab from '../elements/NewArrivalTab';
import Cat3Tab from '../elements/TrendingTab';
import Link from 'next/link';

function CategoryTab({ products, categories }) {
  const [active, setActive] = useState('1');
  const [catAll, setCatAll] = useState([]);
  const [cat1, setCat1] = useState([]);
  const [cat2, setCat2] = useState([]);
  const [cat3, setCat3] = useState([]);
  const [customCategories, setCustomCategories] = useState([]);

  const catPAll = async (items) => {
    const catAllItem = items.filter((item) => item.category_id);
    setCatAll(catAllItem);
    setActive('1');
  };
  const catP1 = async (items) => {
    const cat1Item = items.filter((item) => item.category_id == 1);
    setCat1(cat1Item);
    setActive('2');
  };

  const catP2 = async (items) => {
    const cat2Item = items.filter((item) => item.category_id == 2);
    setCat2(cat2Item);
    setActive('3');
  };

  const catP3 = async (items) => {
    const cat3Item = items.filter((item) => item.category_id == 3);
    setCat3(cat3Item);
    setActive('4');
  };

  useEffect(() => {
    if (products && products.length > 0) {
      catPAll(products);
    }

    if (
      products &&
      products.length > 0 &&
      categories &&
      categories.length > 0
    ) {
      setCustomCategories([]);
      let newArr = [];
      categories.map((category) => {
        let productCount = 0;
        products.map((product) => {
          if (product.category_id == category.id) {
            productCount++;
          }
        });
        category.products = productCount;
        newArr.push(category);
      });
      setCustomCategories(newArr);
    }
  }, [products, categories]);

  return (
    <>
      <div className="section-title style-2 wow animate__animated animate__fadeIn">
        <h3>Popular Products</h3>
        <ul className="nav nav-tabs links" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className={active === '1' ? 'nav-link active' : 'nav-link'}
              onClick={() => catPAll(products)}
            >
              All
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={active === '2' ? 'nav-link active' : 'nav-link'}
              onClick={() => catP1(products)}
            >
              Featured
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={active === '3' ? 'nav-link active' : 'nav-link'}
              onClick={() => catP2(products)}
            >
              Popular
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={active === '4' ? 'nav-link active' : 'nav-link'}
              onClick={() => catP3(products)}
            >
              New added
            </button>
          </li>
        </ul>
      </div>

      <div className="tab-content wow fadeIn animated">
        <div
          className={
            active === '1' ? 'tab-pane fade show active' : 'tab-pane fade'
          }
        >
          <div className="product-grid-4 row">
            <Cat1Tab products={catAll} />
          </div>
        </div>

        <div
          className={
            active === '2' ? 'tab-pane fade show active' : 'tab-pane fade'
          }
        >
          <div className="product-grid-4 row">
            <Cat1Tab products={cat1} />
          </div>
        </div>

        <div
          className={
            active === '3' ? 'tab-pane fade show active' : 'tab-pane fade'
          }
        >
          <div className="product-grid-4 row">
            <Cat3Tab products={cat2} />
          </div>
        </div>
        <div
          className={
            active === '4' ? 'tab-pane fade show active' : 'tab-pane fade'
          }
        >
          <div className="product-grid-4 row">
            <Cat2Tab products={cat3} />
          </div>
        </div>
      </div>
    </>
  );
}
export default CategoryTab;
