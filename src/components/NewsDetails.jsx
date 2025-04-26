import { useEffect, useState, useRef, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";

const News_Details = () => {
  const location = useLocation();
  const data = useMemo(() => location.state ?? [{}, { list: [] }], [location.state]);

  
  const containerRef = useRef(null);

  const { featured_media, content, title, date_gmt, id } = data[0] || {};
  const { list = [] } = data[1] || {};

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!featured_media && !content?.rendered) return;

    if (featured_media) {
      fetch(`http://Picons.local/wp-json/wp/v2/media/${featured_media}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setThumb(data.source_url);
        })
        .catch((err) => console.log(err));
    }
  }, [featured_media]);

  const relatedNews = list.filter((items) => items.id !== id);

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(fbShareUrl, "_blank");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="border-black-500 flex flex-col md:flex-row flex-grow px-4 pt-20 pb-4 mt-4">
        <div className="bg-white shadow-lg rounded-lg md:w-[80%] w-full p-6 md:p-8 flex flex-col border">
          <div className="flex-shrink-0">
            <h1 className="text-4xl md:text-4xl font-bold text-gray-800">
              {title?.rendered || "No title available"}
            </h1>
            <p className="text-l md:text-sm text-gray-500 mt-1">
              🕒 Ngày đăng: {date_gmt || "N/A"}
            </p>
            <div className="border-t border-gray-300 my-3"></div>
          </div>

         
          <div ref={containerRef} className="flex flex-col gap-5 text-base"
               dangerouslySetInnerHTML={{ __html: content?.rendered || "" }}>
          </div>

          <div className="flex-shrink-0 mt-4">
            <button
              onClick={shareOnFacebook}
              className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-md shadow-md hover:bg-blue-700 transition-all"
            >
              Chia sẻ lên Facebook
            </button>
          </div>
        </div>

        <div className="mt-6 md:mt-0 md:ml-auto md:w-[20%] w-full bg-white shadow-lg rounded-lg p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            📌 Tin tức liên quan
          </h3>

          <div className="overflow-y-auto max-h-[1000px] pr-2 flex-grow">
            <ul>
              {relatedNews.map((news) => (
                <li key={news.id} className="mb-4 flex items-center gap-4 border-b pb-3">
                  <div>
                    <Link
                      to="/details"
                      state={[news, { list }]}
                      className="text-blue-600 font-semibold hover:text-blue-800 transition-all"
                    >
                      {news.title?.rendered || "No title"}
                    </Link>
                    <p className="text-xs text-gray-500">{news.date || "N/A"}</p>
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