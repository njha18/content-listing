import { Link } from "react-router-dom";
import { BACKGROUND_IMAGE_URL } from "../utils/constants";

const HomePage = () => {
  return (
    <div className="relative min-h-screen w-full text-white">
      {/* Background image */}
      <img
        src={BACKGROUND_IMAGE_URL}
        alt="backgroundImage"
        className="absolute inset-0 h-full w-full object-cover z-0"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-10" />

      {/* Centered content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold">
          Welcome to Movie Explorer
        </h1>
        <p className="text-base sm:text-lg mt-4 text-gray-300 max-w-lg">
          Discover and explore amazing content. Search, scroll, and stream with
          ease.
        </p>
        <Link
          to="/content"
          className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg text-lg shadow-lg transition duration-300"
        >
          Enter
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
