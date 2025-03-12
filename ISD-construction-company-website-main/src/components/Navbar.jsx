import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 
          ${isScrolled && !isOpen ? "w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center" : "w-[95%] md:w-[80%] bg-white shadow-md rounded-lg"}`}
      >
        {!isScrolled || isOpen ? (
          <div className="container mx-auto flex items-center justify-between py-4 px-6">
            <Link to="/" className="text-2xl font-bold text-black">
              PICONS
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-black">Trang Chủ</Link>
              <Link to='/chung-toi' className="text-gray-700 hover:text-black">Chúng Tôi</Link>
              <Link to='/dich-vu' className="text-gray-700 hover:text-black">Dịch vụ</Link>
              <Link to='/tin-tuc' className="text-gray-700 hover:text-black">Tin Tức</Link>
              <Link to='/du-an' className="text-gray-700 hover:text-black">Dự Án</Link>
              <Link to='/lien-he' className="text-gray-700 hover:text-black">Liên hệ</Link>
            </div>
            <div className="">
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={24} /> : <Menu size={24} className=" md:hidden" />}
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="w-12 h-12 rounded-full bg-white hover:bg-gray-200 shadow-lg flex items-center justify-center absolute"
          >
            <Menu size={24}/>
          </button>
        )}
      </nav>
      {isOpen && (
        <div className="fixed top-[70px] left-1/2 transform -translate-x-1/2 w-[95%] md:w-[80%] bg-white z-50 shadow-md rounded-2xl flex flex-col items-center space-y-4 py-4 transition-all duration-300 md:hidden">
          <Link to="/" className="text-gray-700 hover:text-black" onClick={() => setIsOpen(false)}>Trang Chủ</Link>
          <Link to='/chung-toi' className="text-gray-700 hover:text-black" onClick={() => setIsOpen(false)}>Chúng Tôi</Link>
          <Link to='/dich-vu' className="text-gray-700 hover:text-black" onClick={() => setIsOpen(false)}>Dịch vụ</Link>
          <Link to='/tin-tuc' className="text-gray-700 hover:text-black" onClick={() => setIsOpen(false)}>Tin Tức</Link>
          <Link to='/du-an' className="text-gray-700 hover:text-black" onClick={() => setIsOpen(false)}>Dự Án</Link>
          <Link to='/lien-he' className="text-gray-700 hover:text-black" onClick={() => setIsOpen(false)}>Liên hệ</Link>
        </div>
      )}
    </>
  );
};

export default Navbar;

