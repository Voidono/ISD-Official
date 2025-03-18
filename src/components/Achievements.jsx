import React from 'react'
import { Briefcase, Users, Award } from "lucide-react";

const Achievements = () => {
  return (
    <section className="relative bg-white py-16 px-6 md:px-16">
      {/* Container */}
      <div className="relative bg-white shadow-lg rounded-lg p-8 md:p-12 text-center">
        {/* Logo and Text */}
        <div className="flex flex-col items-center">
          <div className="flex justify-center">
                <img src="/logo.jpg" alt="Company Logo" className="w-32 h-32 object-contain" />
          </div>
          <h2 className="text-blue-700 text-2xl font-bold">
            Our company provides installation brick, block, & stone <br />
            for General Contractors and Building Owners.
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl">
          Picons là công ty xây dựng hàng đầu chuyên cung cấp các dịch vụ thi công và lắp đặt đa dạng, từ xây dựng công trình dân dụng đến công nghiệp. Với đội ngũ kỹ sư và chuyên gia giàu kinh nghiệm, chúng tôi luôn đảm bảo chất lượng, an toàn và tiến độ trong mọi dự án.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-5">
          {/* Projects Done */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 flex items-center justify-center border-4 border-blue-600 rounded-full">
              <Briefcase size={40} className="text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold mt-3 text-gray-800">985</h3>
            <p className="text-blue-600 font-semibold mt-1">Dự Án Đã Hoàn Thành</p>
            <p className="text-gray-500 text-sm">Sed ut perspiciatis unde omnis iste natus.</p>
          </div>

          {/* Trusted Clients */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 flex items-center justify-center border-4 border-blue-600 rounded-full">
              <Users size={40} className="text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold mt-3 text-gray-800">357</h3>
            <p className="text-blue-600 font-semibold mt-1">Khách Hàng & Đối Tác</p>
            <p className="text-gray-500 text-sm">Sed ut perspiciatis unde omnis iste natus.</p>
          </div>

          {/* Awards Earned */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 flex items-center justify-center border-4 border-blue-600 rounded-full">
              <Award size={40} className="text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold mt-3 text-gray-800">1423</h3>
            <p className="text-blue-600 font-semibold mt-1">Giải Thưởng</p>
            <p className="text-gray-500 text-sm">Sed ut perspiciatis unde omnis iste natus.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Achievements