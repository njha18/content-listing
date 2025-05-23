import { BASE_URL } from "../utils/constants";

const Header = ({
  title,
  searchTerm,
  setSearchTerm,
  filterData,
  showSearch,
  setShowSearch,
  suggestions,
  searchError,
  setSuggestions,
  listOfMovies,
  setMoviestoShow,
  navigate,
}) => {
  return (
    // Header container with sticky position
    <div className="sticky top-0 left-0 right-0 z-10 p-4 bg-black flex items-center justify-between h-24 sm:h-20">
      <div
        className={`flex items-center gap-2 whitespace-nowrap ${
          showSearch ? "w-1/12" : "w-1/2"
        } sm:w-1/2 min-w-0`}
      >
        <img
          src={`${BASE_URL}/images/Back.png`}
          alt="Back"
          className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer flex-shrink-0"
          onClick={() => navigate("/")}
        />
        <h1
          className={`text-base sm:text-lg font-semibold text-white ${
            showSearch ? "hidden md:block" : ""
          }`}
        >
          {title}
        </h1>
      </div>

      {/* Right-side search section */}
      <div
        className={`${
          showSearch ? "w-11/12" : "w-1/2"
        } sm:w-1/2 flex justify-end min-w-0`}
      >
        {!showSearch ? (
          // Show search icon if search input is hidden
          <img
            src={`${BASE_URL}/images/search.png`}
            alt="Search Icon"
            className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
            onClick={() => setShowSearch(true)}
          />
        ) : (
          // Search input box with clear button and suggestions
          <div className="relative flex gap-1 sm:gap-2 w-full max-w-xs bg-white rounded px-2 py-1">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => filterData(e.target.value)}
              className="flex-grow text-sm text-black outline-none"
            />
            <button
              onClick={() => {
                setSearchTerm("");
                setMoviestoShow(listOfMovies);
                setShowSearch(false);
              }}
              className="text-gray-600 hover:text-black font-bold text-lg"
            >
              ×
            </button>

            {/* Suggestion list dropdown */}
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 bg-white text-black shadow-md z-20 max-h-48 overflow-auto rounded-b-md">
                {suggestions.map((item, idx) => (
                  <li
                    key={idx}
                    className="px-3 py-2 hover:bg-gray-200 cursor-pointer truncate"
                    onClick={() => {
                      setSearchTerm(item.name);
                      setSuggestions([]);
                      setMoviestoShow(
                        listOfMovies.filter((movie) =>
                          movie.name
                            ?.toLowerCase()
                            .includes(item.name.toLowerCase())
                        )
                      );
                    }}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
            {/* Display validation error below input */}
            {searchError && (
              <div className="absolute top-full left-0 text-sm text-red-600">
                {searchError}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
