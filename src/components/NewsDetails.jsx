import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const News_Details = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const data = location.state || [];
  
  if (!data.length) {
    return <div className="text-center text-red-500">Thông tin không tồn tại.</div>;
  }

  const { title, date, content, imageUrl, id } = data[0];
  const { list } = data[1] || { list: [] };

  const relatedNews = list.filter((item) => item.id !== id);

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(fbShareUrl, "_blank");
  };

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto mt-16">
      <div className="border-black-500 flex flex-col md:flex-row flex-grow px-4 pt-20 pb-4 mt-4">
        <div className="bg-white shadow-lg rounded-lg md:w-4/5 w-full p-6 md:p-8 flex flex-col border">
          <img src={imageUrl} alt="News Thumbnail" className="w-full h-40 object-cover rounded-md mb-3" />
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">🕒 Ngày đăng: {date}</p>
          <div className="border-t border-gray-300 my-3"></div>
          <h2 className="text-base md:text-lg text-gray-700">{content}</h2>
          <button
            onClick={shareOnFacebook}
            className="mt-4 px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-md shadow-md hover:bg-blue-700 transition-all"
          >
            Chia sẻ lên Facebook
          </button>
        </div>

        {/* Related News */}
        <div className="mt-6 md:mt-0 md:ml-auto md:w-1/5 w-full bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">📌 Tin tức liên quan</h3>
          <div className="overflow-y-auto max-h-[1000px] pr-2">
            <ul>
              {relatedNews.map((news) => (
                <li key={news.id} className="mb-4 flex items-center gap-4 border-b pb-3">
                  <img src={news.imageUrl} alt={news.title} className="w-14 h-14 object-cover rounded-md" />
                  <div>
                    <Link
                      to="/details"
                      state={[news, { list }]}
                      className="text-blue-600 font-semibold hover:text-blue-800 transition-all"
                    >
                      {news.title}
                    </Link>
                    <p className="text-xs text-gray-500">{news.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News_Details;