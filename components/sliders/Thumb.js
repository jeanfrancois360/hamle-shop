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
        <SwiperSlide key={product.cover_image}>
          <img src={'https://' + product.cover_image} />
          {/* <Zoom
                            img={item.thumb}
                            zoomScale={5}
                            width={500}
                            height={500}
                            ransitionTime={0.5}
                        /> */}
        </SwiperSlide>
        <SwiperSlide key={product.image_1}>
          <img src={'https://' + product.image_1} />
          {/* <Zoom
                            img={item.thumb}
                            zoomScale={5}
                            width={500}
                            height={500}
                            ransitionTime={0.5}
                        /> */}
        </SwiperSlide>
        <SwiperSlide key={product.image_2}>
          <img src={'https://' + product.image_2} />
          {/* <Zoom
                            img={item.thumb}
                            zoomScale={5}
                            width={500}
                            height={500}
                            ransitionTime={0.5}
                        /> */}
        </SwiperSlide>
        <SwiperSlide key={product.image_3}>
          <img src={'https://' + product.image_3} />
          {/* <Zoom
                            img={item.thumb}
                            zoomScale={5}
                            width={500}
                            height={500}
                            ransitionTime={0.5}
                        /> */}
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        className="mySwiper"
      >
        {/* {product.gallery.map((item) => (
          <SwiperSlide key={item.thumb}>
            <img src={item.thumb} />
          </SwiperSlide>
        ))} */}

        <SwiperSlide key={product.image_1}>
          <img src={'https://' + product.image_1} />
        </SwiperSlide>
        <SwiperSlide key={product.image_2}>
          <img src={'https://' + product.image_2} />
        </SwiperSlide>
        <SwiperSlide key={product.image_3}>
          <img src={'https://' + product.image_3} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ThumbSlider;
