import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { updateProductCategory } from '../../../redux/action/productFiltersAction';

const CategoryProduct3 = ({ updateProductCategory }) => {
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
      <ul className="end">
        <li onClick={(e) => selectCategory(e, 'jersey')}>
          <a>
            <img src="/assets/imgs/theme/icons/icon-1.svg" alt="" />
            Shoes
          </a>
        </li>
        <li onClick={(e) => selectCategory(e, 'jersey')}>
          <a>
            <img src="/assets/imgs/theme/icons/icon-1.svg" alt="" />
            Jersey
          </a>
        </li>
      </ul>
    </>
  );
};

export default connect(null, { updateProductCategory })(CategoryProduct3);
