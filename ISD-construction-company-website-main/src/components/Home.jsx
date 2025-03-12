import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

// how to import ảnh
import img1 from "../assets/home-image-1.jpg";
import img2 from "../assets/home-image-2.jpg";
import img3 from "../assets/home-image-3.jpg";

const Home = () => {
  return (
    <>
      <div>
      {/* Fullscreen Carousel */}
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 4000 }}
        loop
        className="w-full h-screen"
      >
        <SwiperSlide>
          <img src={img1} alt="Home 1" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt="Home 2" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt="Home 3" className="w-full h-full object-cover" />
        </SwiperSlide>
      </Swiper>
    </div>
    {/* Scroll Down Section */}
    <div className="w-full h-auto flex flex-col items-center text-center p-12">

    {/* Text Content */}
    <div className="w-full max-w-3xl">
      <h2 className="text-gray-500 text-3xl font-light">Giới thiệu</h2>
      <h1 className="text-logo-gradient text-6xl font-bold">PICONS</h1>
      <p className="mt-6 text-gray-700 text-lg font-semibold">
        KHỞI ĐẦU TỪ MỘT NỀN MÓNG VỮNG CHẮC
      </p>
      <p className="mt-4 text-gray-600 leading-relaxed">
        Đó là triết lý, là kim chỉ nam được xây dựng trong suốt quá trình hình thành và phát triển của Hợp Lực.fffff
        ffffff fffff ffffff ffff ff fff ffffff ff fffffff ffff ffffff ff fff  fffff  fff ffff fffff ff ffff fff f ffff  f   ffff  ff fffff  ffff ff ffff
      </p>
    </div>

    {/* Image Grid Section */}
    <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      {/* Image 1 */}
      <div className="relative group">
        <img src={img1} alt="Lịch sử hình thành" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
          <span className="text-white text-xl font-semibold">TỔNG QUAN CÔNG TY</span>
        </div>
      </div>

      {/* Image 2 */}
      <div className="relative group">
        <img src={img2} alt="Tầm nhìn sứ mệnh" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
          <span className="text-white text-xl font-semibold">TẦM NHÌN SỨ MỆNH</span>
        </div>
      </div>

      {/* Image 3 */}
      <div className="relative group">
        <img src={img3} alt="Giá trị cốt lõi" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
          <span className="text-white text-xl font-semibold">GIÁ TRỊ CỐT LÕI</span>
        </div>
      </div>
    </div>

    {/* Learn More Button */}
    <Link to='/chung-toi' className="mt-6 text-red-600 font-semibold hover:underline">Tìm hiểu thêm →</Link>
    </div>

    </>
  );
};

export default Home;
