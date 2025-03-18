import { useState } from "react";
import { Users, Book, Briefcase, Shield, Globe, LifeBuoy } from "lucide-react";
import img1 from "../assets/home-image-1.jpg";
import img2 from "../assets/home-image-2.jpg";
import img3 from "../assets/home-image-3.jpg";

const departments = [
  { name: "Management", icon: Users },
  { name: "Accounting", icon: Book },
  { name: "Council", icon: Briefcase },
  { name: "Insurance", icon: Globe },
  { name: "Bonding", icon: Shield },
  { name: "Safety", icon: LifeBuoy },
];

const staffData = {
  Management: [
    { name: "Everett T. Greenstreet Jr.", title: "Founder, CEO", img: img1 },
    { name: "Everett T. Greenstreet III", title: "Co-Founder, CFO", img: img2 },
  ],
  Accounting: [
    { name: "Shane J. Greenstreet", title: "Co-Founder, COO", img: img3 },
  ],
  // Add other departments and staff here
};

export default function StaffCarousel() {
  const [selectedDept, setSelectedDept] = useState("Management");

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Đội ngũ của chúng tôi</h2>
      <p className="text-lg text-gray-600 mb-6 text-center">
      Đội ngũ kiến trúc sư, kỹ sư và chuyên gia xây dựng giàu kinh nghiệm của chúng tôi là xương sống của thành công. Chúng tôi hợp tác để đưa ra các giải pháp sáng tạo, đảm bảo mọi dự án được hoàn thành đúng tiến độ và ngân sách.
      </p>

      {/* Department Selector */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {departments.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => setSelectedDept(name)}
            className={`p-2 flex items-center gap-2 border-b-2 ${
              selectedDept === name ? "border-blue-500 text-blue-600" : "border-transparent text-gray-600"
            } transition-all`}
          >
            <Icon size={20} />
            {name}
          </button>
        ))}
      </div>

      {/* Staff Members Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {staffData[selectedDept]?.map((staff, index) => (
          <div key={index} className="text-center p-4 border rounded-lg shadow-lg bg-white">
            <img
              src={staff.img}
              alt={staff.name}
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">{staff.name}</h3>
            <p className="text-gray-500">{staff.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


