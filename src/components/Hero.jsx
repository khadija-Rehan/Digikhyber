import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // optional but sometimes needed for strict setups

const Hero = () => {
  return (
    <section className="hero">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={5}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        pagination={{ clickable: true }}
        navigation={false}
      >


        <SwiperSlide>
          <img src="/images/Digikhyber hero banner-02.jpg" alt="Hero 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/Digikhyber hero banner 1-02.jpg" alt="Hero 2" />
        </SwiperSlide>
         <SwiperSlide>
          <img src="/images/Digikhyber hero banner 3-02.jpg" alt="Hero 3" />
        </SwiperSlide>

    {/* <SwiperSlide>
          <img src="/images/Slider1-02.jpg" alt="Hero 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/Slider2-02.jpg" alt="Hero 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/Slider3-02.jpg" alt="Hero 3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/Slider4-02.jpg" alt="Hero 4" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/Slider5-02.jpg" alt="Hero 5" />
        </SwiperSlide> */}
      </Swiper>
    </section>
  );
};

export default Hero;
