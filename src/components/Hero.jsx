import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ML from "../assets/slider1.png";
import UI from "../assets/slider1.png";
import DM from "../assets/slider1.png";
const Hero = () => {
    return (
        <section className="hero">
            <Swiper
                spaceBetween={5}
                slidesPerView={1}
                loop={true}
                autoplay={true}
                pagination={{ clickable: true }}
                navigation={false}
            >
                <SwiperSlide>
                    <img src={ML} alt="Hero 1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={UI} alt="Hero 2" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={DM} alt="Hero 3" />
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Hero;
