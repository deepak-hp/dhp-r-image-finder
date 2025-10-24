import "animate.css";
import "remixicon/fonts/remixicon.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const API_KEY = "563492ad6f917000010000016c0484bed55c46ef8d5348ed8b2bcdc5";

const App = () => {
  const [query, setQuery] = useState("people");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const options = {
        headers: {
          Authorization: API_KEY,
        },
      };
      const res = await axios.get(
        `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=12`,
        options
      );
      const data = await res.data;
      console.log(data);
      setData((prev) => [...prev, ...data.photos]);
    } catch (error) {
      toast.error("Failed to fetch images", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const search = (e) => {
    e.preventDefault();
    setData([]);
    fetchImages();
  };

  useEffect(() => {
    if (query) fetchImages();
  }, [page]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8 gap-12 animate__animated animate__fadeIn">
      <h1 className=" flex text-4xl font-bold text-indigo-600">
        📷 Image Gallery
      </h1>
      <form onSubmit={search} className="flex">
        <input
          className="p-3 bg-white rounded-l-lg w-[400px] focus:outline-indigo-500"
          type="text"
          placeholder="Search image here"
          required
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="bg-linear-to-br from-indigo-600 via-blue-500 to-indigo-600 text-white font-bold py-3 px-8 rounded-r-lg hover:scale-103 transition-transform">
          Search
        </button>
      </form>
      <div className="grid lg:grid-cols-4 lg:gap-12 gap-8 w-9/12">
        {data.length
          ? data?.map((photo, index) => (
              <div key={photo.id} className={"bg-white rounded-xl"}>
                <img
                  className={
                    "rounded-t-lg h-[180px] object-cover w-full hover:scale-110 transition-transform duration-300"
                  }
                  src={photo.src.medium}
                  alt={photo.alt}
                />
                <div className="p-3">
                  <h1 className="text-lg font-medium text-gray-600 capitalize">
                    {photo.photographer}
                  </h1>
                  <a
                    className="mt-3 block bg-green-500 font-bold py-2 rounded-lg text-center hover:scale-105 transition-transform duration-300"
                    href={photo.src.original}
                    target="_blank"
                  >
                    <i className="ri-download-line mr-1" />
                    Download
                  </a>
                </div>
              </div>
            ))
          : !loading && (
              <h1 className="text-4xl font-bold text-center">
                Search result not found
              </h1>
            )}
      </div>
      {loading && (
        <i className="ri-loader-2-line text-6xl text-gray-400 animate-spin"></i>
      )}
      {!!data.length && (
        <button
          onClick={loadMore}
          className="bg-rose-500 px-16 py-3 font-medium rounded-lg text-white  hover:scale-105 transition-transform duration-300"
        >
          Load more
        </button>
      )}
      <ToastContainer />
    </div>
  );
};

export default App;
