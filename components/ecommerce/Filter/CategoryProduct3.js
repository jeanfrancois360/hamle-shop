import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { updateProductCategory } from '../../../redux/action/productFiltersAction';
import { useEffect } from 'react';

const CategoryProduct3 = ({ updateProductCategory, categories }) => {
  const router = useRouter();

  // const removeSearchTerm = () => {
  //     router.push({
  //         pathname: "/products",
  //     });
  // };

  const selectCategory = (e, category) => {
    e.preventDefault();
    // removeSearchTerm();
    updateProductCategory(category);
    router.push({
      pathname: '/products',
      query: {
        cat: category, //
      },
    });
  };

  return (
    <>
      <ul>
        {categories &&
          categories.length > 0 &&
          categories.map((cat, i) => (
            <li key={i} onClick={(e) => selectCategory(e, cat.name)}>
              <a>
                <img src="/assets/imgs/theme/icons/icon-1.svg" alt="" />
                {cat.name}
              </a>
            </li>
          ))}
      </ul>
    </>
  );
};

export default connect(null, { updateProductCategory })(CategoryProduct3);
