import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { client, urlFor } from '../lib/sanityClient';

const News = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [newsItems, setNewsItems] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchResults, setSearchResults] = useState(null); // null ban đầu

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const query = `*[_type == "post"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          mainImage,
          publishedAt,
          author->{ name },
          body
        }`;
        const data = await client.fetch(query);
        setNewsItems(data);
      } catch (err) {
        console.error('Error fetching news:', err);
      }
    };
    fetchNews();
  }, []);

  const handleSearch = () => {
    const filtered = newsItems.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(searchTitle.toLowerCase());
      const dateMatch = searchDate
        ? new Date(item.publishedAt).toISOString().slice(0, 10) === searchDate
        : true;
      return titleMatch && dateMatch;
    });
    setSearchResults(filtered);
    setCurrentPage(1); // Reset page về 1 khi tìm kiếm
  };

  // Danh sách bài viết hiển thị: nếu có searchResults thì lấy searchResults, không thì lấy toàn bộ
  const listToShow = searchResults !== null ? searchResults : newsItems;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listToShow.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow max-w-6xl mx-auto p-4">
        <header className="text-center py-20">
          <h1 className="text-4xl font-bold">Chuyên mục tin tức</h1>
          <p className="text-gray-600 mt-6">
            Cập nhật những tin tức mới nhất từ công ty chúng tôi
          </p>
        </header>

        {/* Search Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center">
          <input
            type="text"
            placeholder="Tìm theo tiêu đề..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="border rounded-lg py-2 px-4 w-64 focus:ring focus:ring-blue-300"
          />
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="border rounded-lg py-2 px-4 w-64 focus:ring focus:ring-blue-300"
          />
          <button
            onClick={handleSearch}
            className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600"
          >
            Tìm kiếm
          </button>
        </div>

        {/* News List */}
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <article
                key={item._id}
                className="border border-cyan-500 shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow p-4 flex flex-col justify-between hover:bg-gray-100"
              >
                {item.mainImage && (
                  <img
                    src={urlFor(item.mainImage).url()}
                    alt={item.title}
                    className="w-full h-48 object-cover mb-4 max-h-40"
                  />
                )}
                <div className="flex flex-col flex-grow">
                  <Link to={`/tin-tuc/${item.slug.current}`} state={{ item, list: newsItems }}>
                    <h3 className="text-sm font-semibold cursor-pointer hover:text-cyan-400 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </Link>
                  <div className="mt-auto">
                    <p className="text-sm text-gray-500">
                      Ngày đăng: {new Date(item.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">Không tìm thấy bài viết phù hợp.</p>
          )}
        </section>

        {/* Pagination */}
        {listToShow.length > itemsPerPage && (
          <nav className="mt-8 flex justify-center">
            <ul className="inline-flex items-center gap-3">
              {[...Array(Math.ceil(listToShow.length / itemsPerPage)).keys()].map((number) => (
                <li key={number}>
                  <button
                    onClick={() => paginate(number + 1)}
                    className={`px-3 py-1 border rounded-[10px] ${
                      currentPage === number + 1
                        ? 'bg-blue-200'
                        : 'bg-white hover:bg-cyan-100 hover:scale-110 transition-transform duration-300'
                    }`}
                  >
                    {number + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(listToShow.length / itemsPerPage)}
                  className={`px-3 py-1 border rounded-[10px] ${
                    currentPage === Math.ceil(listToShow.length / itemsPerPage)
                      ? 'bg-gray-200 cursor-not-allowed'
                      : 'bg-white hover:bg-cyan-100 hover:scale-110 transition-transform duration-300'
                  }`}
                >
                  ➤
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default News;
