import SwiperCore, { Navigation } from 'swiper';
import SingleProduct from '../ecommerce/SingleProduct';

SwiperCore.use([Navigation]);

const NewArrivalTab = ({ products }) => {
  const showItem = 9;
  return (
    <>
      {products.slice(0, showItem).map((product, i) => (
        <div className="col-lg-4 col-md-4 col-12 col-sm-6" key={i}>
          <SingleProduct product={product} />
        </div>
      ))}
    </>
  );
};

export default NewArrivalTab;
