import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home'
import { Mail, Phone, MapPin,} from "lucide-react"
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'

const News = () =>{
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
  
    const newsItems = Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      title: `Tin tức số ${index + 1}`,
      date: `0${(index % 9) + 1}/03/2025`,
      content:
     "PICONS tự hào là đơn vị tiên phong trong lĩnh vực thiết kế và thi công các công trình công nghiệp, dân dụng với chất lượng vượt trội và uy tín hàng đầu.\n\nVới đội ngũ kỹ sư giỏi, giàu kinh nghiệm cùng sự tận tâm trong từng dự án, công ty không ngừng đổi mới và áp dụng công nghệ tiên tiến nhằm mang đến những giải pháp tối ưu nhất cho khách hàng.\n\nPICONS đã và đang khẳng định vị thế vững chắc trên thị trường khi hợp tác với nhiều chủ đầu tư lớn, đặc biệt là các doanh nghiệp Đài Loan, thực hiện hàng loạt dự án quy mô lớn trên khắp cả nước, tập trung nhiều tại các khu công nghiệp trọng điểm như Hà Nam, Vĩnh Phúc, Nam Định, Hải Dương…\n\nSự chuyên nghiệp trong từng giai đoạn từ thiết kế, thi công đến bàn giao giúp PICONS xây dựng niềm tin vững chắc với khách hàng, đảm bảo tiến độ, chất lượng và hiệu quả kinh tế cao nhất.\n\nVới phương châm Chất lượng – Tiến độ – Hiệu quả, PICONS cam kết không chỉ mang đến những công trình bền vững, thẩm mỹ mà còn đảm bảo an toàn và đóng góp tích cực vào sự phát triển bền vững của ngành xây dựng Việt Nam.\n\nPICONS là đơn vị hàng đầu trong lĩnh vực thiết kế và thi công các công trình công nghiệp và dân dụng, với nhiều năm kinh nghiệm và uy tín vững chắc trên thị trường. Công ty luôn đặt chất lượng, tiến độ và hiệu quả kinh tế lên hàng đầu, cam kết mang đến những công trình không chỉ đảm bảo tính thẩm mỹ mà còn đáp ứng đầy đủ các tiêu chuẩn kỹ thuật khắt khe nhất.\n\nVới đội ngũ kỹ sư, kiến trúc sư và công nhân lành nghề, PICONS không ngừng đổi mới, ứng dụng công nghệ tiên tiến vào quá trình thi công để tối ưu hóa hiệu suất làm việc và nâng cao chất lượng công trình.\n\nNhờ vào sự chuyên nghiệp và tận tâm, PICONS đã trở thành đối tác tin cậy của nhiều "
  ,
      imageUrl: 'https://htland.vn/wp-content/uploads/2019/08/cong-du-an-phuc-an-garden-binh-duong-1024x523.jpg',
    }));
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = newsItems.slice(indexOfFirstItem, indexOfLastItem);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    return (
      <div className="py-16 px-6 max-w-7xl mx-auto mt-16">
        <div className="flex-grow max-w-6xl mx-auto p-4">
          <header className="text-center py-20">
            <h1 className="text-4xl font-bold">Chuyên mục tin tức</h1>
            <p className="text-gray-600 mt-6">Cập nhật những tin tức mới nhất từ công ty chúng tôi</p>
          </header>
  
          <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-1 ">
            {currentItems.map((item) => (
              <article 
                key={item.id} 
                className="border border-cyan-500 shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow p-4 h-64 flex flex-col justify-between hover:bg-gray-100 h ">
                {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-150 h-48 object-cover mb-4 max-h-40" />}
                <Link 
               
                to ='/details' state={[item, {list:newsItems}] }><h3
                className="text-xl font-semibold mb-2 cursor-pointer hover:text-cyan-400 transition-colors">{item.title} </h3></Link>
                <p className="text-sm text-gray-500 mb-4">Ngày đăng: {item.date}</p>
                
              </article>
            ))}
          </section>
  
          <nav className="mt-8 flex justify-center">
    <ul className="inline-flex items-center gap-3">
     
  
      
      {[...Array(Math.ceil(newsItems.length / itemsPerPage)).keys()].map(number => (
        <li key={number}>
          <button
            onClick={() => paginate(number + 1)}
            className={`px-3 py-1 border rounded-[10px] p-4 ${
              currentPage === number + 1 ? 'bg-blue-200' : 'bg-white hover:bg-cyan-100 hover:scale-110 transition-transform duration-300'
            }`}
          >
            {number + 1}
          </button>
        </li>
      ))}
  
     
      <li>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(newsItems.length / itemsPerPage)}
          className={` text-center px-3 py-1 border rounded-[10px] p-4 ${
            currentPage === Math.ceil(newsItems.length / itemsPerPage) ? 'bg-gray-200 cursor-not-allowed' : 'bg-white hover:bg-cyan-100 hover:scale-110 transition-transform duration-300'
          }`}
        >
           ➤
        </button>
      </li>
    </ul>
  </nav>
        </div>
      </div>
    );
  }

export default News;