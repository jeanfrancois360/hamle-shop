/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import SwiperCore, { Navigation, Thumbs } from 'swiper';
import 'swiper/css/thumbs';
import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Navigation, Thumbs]);

const ThumbSlider = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        className="mySwiper2"
      >
        {product.gallery.map((item) => (
          <SwiperSlide key={item.thumb}>
            <img src={item.thumb} />
            {/* <Zoom
                            img={item.thumb}
                            zoomScale={5}
                            width={500}
                            height={500}
                            ransitionTime={0.5}
                        /> */}
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        className="mySwiper"
      >
        {product.gallery.map((item) => (
          <SwiperSlide key={item.thumb}>
            <img src={item.thumb} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ThumbSlider;
