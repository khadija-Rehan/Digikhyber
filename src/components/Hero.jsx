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
                }}
                pagination={{ clickable: false }}
                navigation={true}
            >
                <SwiperSlide>
                    <img
                        src="/images/Hunarmand Punjab 50000 Schilarship Slider 1.jpg"
                        alt="Hero 1"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/images/Scholarship Card Slider 2.jpg"
                        alt="Hero 2"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/images/Hunarmand Punjab Courses Slider 3.jpg"
                        alt="Hero 3"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/images/Hunarmand Punjab Freelancing Banner 4.jpg"
                        alt="Hero 4"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/images/Hunarmand Punjab ESkills Slider 5.jpg"
                        alt="Hero 5"
                    />
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Hero;
