import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { updateProductCategory } from '../../../redux/action/productFiltersAction';

const CategoryProduct = ({ updateProductCategory, products, categories }) => {
  const router = useRouter();
  const [customCategories, setCustomCategories] = useState([]);

  const selectCategory = (e, category) => {
    e.preventDefault();
    // removeSearchTerm();
    if (category != 'All') {
      updateProductCategory(category);
      router.push({
        pathname: '/products',
        query: {
          cat: category, //
        },
      });
    } else {
      router.push({
        pathname: '/products',
      });
    }
  };

  useEffect(() => {
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
      <ul>
        <li onClick={(e) => selectCategory(e, 'All')}>
          <a>All</a>
        </li>
        {customCategories &&
          customCategories.length > 0 &&
          customCategories.map((category) => (
            <li
              key={category.id}
              onClick={(e) => selectCategory(e, category.name)}
            >
              <a>
                <img src="/assets/imgs/theme/icons/icon-1.svg" alt="" />
                {category.name}
              </a>
              <span className="count">{category.products}</span>
            </li>
          ))}
      </ul>
    </>
  );
};

export default connect(null, { updateProductCategory })(CategoryProduct);
