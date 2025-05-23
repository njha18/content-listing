import { BASE_URL } from "../utils/constants";

const MovieGrid = ({ moviesToShow, itemRefs, handleKeyNavigation }) => {
  return moviesToShow.length === 0 ? (
    // Show fallback when no movies are available
    <div className="p-4 mt-4 text-white text-center text-lg">
      No movies to show.
    </div>
  ) : (
    // Grid layout for displaying movie cards
    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 p-4">
      {moviesToShow.map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          {/* Movie poster image */}
          <img
            loading="lazy"
            ref={(el) => (itemRefs.current[i] = el)} // Store reference for keyboard navigation
            tabIndex={0} // Make image focusable
            onKeyDown={(e) => handleKeyNavigation(e, i)} // Handle arrow key navigation
            src={`${BASE_URL}/images/${item["poster-image"]}`}
            alt={item.name}
            className="aspect-[2/3] w-full rounded-lg object-cover hover:scale-105 focus:scale-105 transition-transform duration-200"
            onError={(e) => {
              // Fallback to placeholder if poster image is missing
              e.target.onerror = null;
              e.target.src = `${BASE_URL}/images/placeholder_for_missing_posters.png`;
            }}
          />
          {/* Movie title or fallback text */}
          <span className="mt-1 text-left text-sm font-normal text-white w-full truncate">
            {item.name || "Untitled"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
