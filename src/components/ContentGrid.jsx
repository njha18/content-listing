import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BASE_URL, MAX_SEARCH_TERM_LENGTH } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import MovieGrid from "./MovieGrid";

const ContentGrid = () => {
  // State to store all fetched movies from the API
  const [listOfMovies, setListofMovies] = useState([]);
  // Subset of movies filtered by search
  const [moviesToShow, setMoviestoShow] = useState([]);
  // Current page for pagination
  const [page, setPage] = useState(1);
  // Ref to prevent duplicate API calls
  const isLoadingRef = useRef();
  // Flag to track if there are more pages available
  const [hasMorePages, sethasMorePages] = useState(true);
  // Ref for the infinite scroll trigger element
  const observerRef = useRef();
  // Controlled input for search bar
  const [searchTerm, setSearchTerm] = useState("");
  // Toggle for showing/hiding the search input
  const [showSearch, setShowSearch] = useState(false);
  // References to each movie card for keyboard navigation
  const itemRefs = useRef([]);
  // Title of the movie list (from API)
  const [title, setTitle] = useState("");
  // Suggestions shown in dropdown below search input
  const [suggestions, setSuggestions] = useState([]);
  // Error message for invalid search input
  const [searchError, setSearchError] = useState("");
  // React Router navigation hook
  const navigate = useNavigate();

  // Fetch data every time the page number changes
  useEffect(() => {
    fetchData(page);
  }, [page]);

  // Set up and clean up the IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMorePages &&
          !isLoadingRef.current
        ) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasMorePages]);

  // Fetch content data for a given page number
  const fetchData = async (pageNum) => {
    if (!hasMorePages || isLoadingRef.current) return;
    isLoadingRef.current = true;
    try {
      const res = await axios.get(`${BASE_URL}/data/page${pageNum}.json`);
      const data = res.data.page["content-items"].content;
      setTitle(res.data.page.title);
      if (data.length === 0) {
        sethasMorePages(false);
      } else {
        const tempData = [...listOfMovies, ...data];
        setListofMovies(tempData);
        const displayMovieList = tempData.filter((item) =>
          item.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setMoviestoShow(displayMovieList);
        if (
          res.data.page["page-size-requested"] >
          res.data.page["page-size-returned"]
        )
          sethasMorePages(false);
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
      sethasMorePages(false);
    } finally {
      isLoadingRef.current = false;
    }
  };

  // Handle arrow key navigation between movie cards
  const handleKeyNavigation = (e, index) => {
    const cols = window.innerWidth < 768 ? 3 : 5;
    let nextIndex = index;

    switch (e.key) {
      case "ArrowRight":
        nextIndex = index + 1;
        break;
      case "ArrowLeft":
        nextIndex = index - 1;
        break;
      case "ArrowDown":
        nextIndex = index + cols;
        break;
      case "ArrowUp":
        nextIndex = index - cols;
        break;
      default:
        return;
    }

    e.preventDefault();
    if (itemRefs.current[nextIndex]) {
      itemRefs.current[nextIndex].focus();
    }
  };

  // Handle search input and filter movie list accordingly
  const filterData = (term) => {
    // Show an error if the user exceeds the allowed character limit
    if (term.length > MAX_SEARCH_TERM_LENGTH) {
      setSearchError(
        `Search term cannot exceed ${MAX_SEARCH_TERM_LENGTH} characters.`
      );
      return;
    }

    setSearchError(""); // Clear error if valid
    setSearchTerm(term);

    if (!term.trim()) {
      setSuggestions([]);
      setMoviestoShow(listOfMovies);
      return;
    }

    const filtered = listOfMovies.filter((item) =>
      item.name?.toLowerCase().includes(term.toLowerCase())
    );

    // Remove duplicate movie names from suggestions
    const seen = new Set();
    const uniqueSuggestions = filtered.filter((item) => {
      if (seen.has(item.name)) return false;
      seen.add(item.name);
      return true;
    });

    setSuggestions(uniqueSuggestions.slice(0, 5));
    setMoviestoShow(filtered);
  };

  return (
    <>
      {/* Header with title, search bar, suggestions, and back button */}
      <Header
        title={title}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterData={filterData}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        suggestions={suggestions}
        searchError={searchError}
        setSuggestions={setSuggestions}
        listOfMovies={listOfMovies}
        setMoviestoShow={setMoviestoShow}
        navigate={navigate}
      />
      {/* Grid of movie posters */}
      <MovieGrid
        moviesToShow={moviesToShow}
        itemRefs={itemRefs}
        handleKeyNavigation={handleKeyNavigation}
      />
      {/* Element observed for infinite scroll */}
      <div ref={observerRef} className="h-10 w-full" />
    </>
  );
};

export default ContentGrid;
