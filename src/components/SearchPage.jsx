import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import { useSearchParams, useNavigate } from "react-router-dom";

export const MovieCard_2 = ({ movie }) => {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState("");
  const [movieViews, setMovieViews] = useState();
  const [viewsType, setViewsType] = useState("");

  const cardStyles = {
    display: "flex",
    width: "100%",
    maxWidth: "600px",
    margin: "10px",
    backgroundColor: "#111",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    overflow: "hidden",
  };

  const thumbnailStyles = {
    width: "25%",
    height: "200px",
    objectFit: "cover",
    filter: isHovered === "img" ? "blur(1px" : "none",
    cursor: "pointer",
  };

  const contentContainerStyles = {
    display: "flex",
    flexDirection: "column",
    padding: "16px",
  };

  const titleStyles = {
    //   fontSize: '18px',
    //   fontWeight: 'bold',
    marginBottom: "8px",
    color: isHovered === "h2" ? "rgb(32, 194, 14)" : "#c71414",
    cursor: "pointer",
  };

  const metadataStyles = {
    display: "flex",
    flexDirection: "column",
    color: "#777",
  };

  const metadataItemStyles = {
    marginBottom: "4px",
  };

  useEffect(() => {
    const views = parseInt(movie.views);
    if (views < 1000) {
      setViewsType("");
      setMovieViews(views);
    }
    if (views > 1000) {
      let convertViews = views / 1000;
      setMovieViews(convertViews);
      setViewsType("K");
    }
    if (views > 1000000) {
      let convertViews = views / 1000000;
      setMovieViews(convertViews);
      setViewsType("M");
    }
    if (views > 1000000000) {
      let convertViews = views / 1000000000;
      setMovieViews(convertViews);
      setViewsType("B");
    }
  }, [movie.views]);

  const handleMouseEnter = (e) => {
    if (e._targetInst.elementType) {
      setIsHovered(e._targetInst.elementType);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered("");
  };

  return (
    <div style={cardStyles}>
      {/* Thumbnail */}
      <img
        onClick={() => navigate(`/watch?id=${movie.id}&title=${movie.title}`)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={thumbnailStyles}
        src={movie.poster}
        alt={movie.title}
      />

      {/* Content */}
      <div style={contentContainerStyles}>
        {/* Title */}
        <h2
          onClick={() => navigate(`/watch?id=${movie.id}&title=${movie.title}`)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={titleStyles}
        >
          {movie.title}
        </h2>

        {/* Metadata */}
        <div style={metadataStyles}>
          <span style={metadataItemStyles}>{movie.releaseDate}</span>
          <span style={metadataItemStyles}>
            {movieViews}
            {viewsType} views
          </span>
          <span style={{ ...metadataItemStyles, marginTop: "10px" }}>
            {movie.description}
          </span>
        </div>
      </div>
    </div>
  );
};

const SearchPage = () => {
  const apiUrl = "http://localhost:7700";

  const [searchParams] = useSearchParams();
  const searchQueryValue = searchParams.get("q");

  const [movies, setMovies] = useState([]);

  const styles = {
    container: {
      width: "100%",
      height: "100%",
      color: "#bebebe",
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
    },
    main: {
      width: "50%",
      marginLeft: "50%",
      transform: "translate(-50%, 0%)",
      marginTop: "10px",
      backgroundColor: "rgb(0, 0, 0,90%)",
      padding: "10px",
      minHeight: "100vh",
    },
  };

  // get search movie
  useEffect(() => {
    const getSearchedMovie = async () => {
      if (searchQueryValue) {
        const response = await fetch(
          `${apiUrl}/movies/searchMovie?q=${searchQueryValue}`
        );
        const data = await response.json();
        setMovies(data);
      }
    };
    getSearchedMovie();
  }, [searchQueryValue]);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div id="searchPage_wrapper">
        <div style={styles.main}>
          <div style={styles.container}>
            {movies.map((movie, idx) => {
              return <MovieCard_2 key={idx} movie={movie} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
