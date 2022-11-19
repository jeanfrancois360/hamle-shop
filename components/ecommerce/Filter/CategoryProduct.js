import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { updateProductCategory } from '../../../redux/action/productFiltersAction';

const CategoryProduct = ({ updateProductCategory }) => {
  const router = useRouter();

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
        <li onClick={(e) => selectCategory(e, '')}>
          <a>All</a>
        </li>
        <li onClick={(e) => selectCategory(e, 'jersey')}>
          <a>
            <img src="/assets/imgs/theme/icons/icon-1.svg" alt="" />
            Jersey
          </a>
          <span className="count">2</span>
        </li>
        <li onClick={(e) => selectCategory(e, 'shoe')}>
          <a>
            <img src="/assets/imgs/theme/icons/icon-1.svg" alt="" />
            Shoes
          </a>
          <span className="count">1</span>
        </li>
      </ul>
    </>
  );
};

export default connect(null, { updateProductCategory })(CategoryProduct);
