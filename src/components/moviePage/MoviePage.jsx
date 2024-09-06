import React, { useEffect, useState, useRef } from "react";
import "./moviePage.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import MovieCard from "../movieCard/MovieCard";
import Navbar from "../navbar/Navbar";
import PreLoader from "../preLoader/PreLoader";

const MoviePage = () => {
  const apiUrl = "http://localhost:7700";

  // initialize ref
  const ctgryTrackerRef = useRef(null);

  const router = useNavigate();

  // initialize state
  const [movies, setMovies] = useState([]);
  const [selectGenre, setSelectGenre] = useState("");
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const ctgryTracker = ctgryTrackerRef.current;
  //   let isDragging = false;
  //   let startX;
  //   let scrollLeft;

  //   const ctgryTrackerMouseMove = (e) => {
  //     if (!isDragging) return;
  //     const x = e.clientX - startX;
  //     ctgryTracker.scrollLeft = scrollLeft - x;
  //   };

  //   const ctgryTrackerMouseDown = (e) => {
  //     isDragging = true;
  //     ctgryTracker.classList.add("category_tracker_move");
  //     startX = e.clientX;
  //     scrollLeft = ctgryTracker.scrollLeft;
  //     ctgryTracker.addEventListener("mousemove", ctgryTrackerMouseMove);
  //   };

  //   const ctgryTrackerMouseUp = () => {
  //     isDragging = false;
  //     ctgryTracker.classList.remove("category_tracker_move");
  //     ctgryTracker.removeEventListener("mousemove", ctgryTrackerMouseMove);
  //   };

  //   ctgryTracker.addEventListener("mousedown", ctgryTrackerMouseDown);
  //   ctgryTracker.addEventListener("mouseup", ctgryTrackerMouseUp);
  //   ctgryTracker.addEventListener("mouseleave", ctgryTrackerMouseUp);

  //   return () => {
  //     ctgryTracker.removeEventListener("mousedown", ctgryTrackerMouseDown);
  //     ctgryTracker.removeEventListener("mouseup", ctgryTrackerMouseUp);
  //     ctgryTracker.removeEventListener("mouseleave", ctgryTrackerMouseUp);
  //   };
  // }, []);

  const pathAdress = location.pathname.split("/")[1];

  useEffect(() => {
    const getAllMovies = async () => {
      setLoading(true);
      const res = await fetch(`${apiUrl}/movies/getAllMovies/${pathAdress}/0`);
      const data = await res.json();
      setLoading(false)
      setMovies(data);
    };
    getAllMovies();

    return () => {
      setMovies([]);
    };
  }, [pathAdress]);

  // Infinite scroll handler
  useEffect(() => {
    const windowScroll = async () => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        const res = await fetch(
          `${apiUrl}/movies/getAllMovies/${pathAdress}/${movies.length}`
        );
        const data = await res.json();
        setMovies((prevMovies) => [...prevMovies, ...data]);
      }
    };

    window.addEventListener("scroll", windowScroll);

    return () => {
      window.removeEventListener("scroll", windowScroll);
    };
  }, [movies, pathAdress]);

  // handle select genre
  // const handleSelectGenre = (e) => {
  //   // const genre = e.target.innerText;
  //   // console.log(genre)
  //   // const regex = new RegExp(genre, "i");
  //   // const filteredMovies = movies.filter((movie) => regex.test(movie.genre));
  //   // setMovies(filteredMovies);
  // };

  return (
    <div id="moviePage">
      {/* navbar */}
      <Navbar />
      {/* side bar */}
      <Sidebar />
      <div id="go-to-top-arrow">
        <a href="#header">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="800px"
            height="800px"
            viewBox="0 0 48 48"
            fill="none"
          >
            <rect width="48" height="48" fill="white" fillOpacity="0.01" />
            <path
              d="M12 24L24 12L36 24"
              stroke="#0e0d0d"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 36L24 24L36 36"
              stroke="#0e0d0d"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      {/* <div id="header">
        <div id="category">
          <div ref={ctgryTrackerRef} id="category_tracker">
            <span
              onClick={handleSelectGenre}
              id="action-movies"
              className="category-item"
            >
              Action
            </span>
            <span onClick={handleSelectGenre} id="drama-movies" className="category-item">
              Drama
            </span>
            <span onClick={handleSelectGenre} id="romance-movies" className="category-item">
              Romance
            </span>
            <span onClick={handleSelectGenre} id="sci-fi-movies" className="category-item">
              Sci_fi
            </span>
            <span  onClick={handleSelectGenre} id="thriller" className="category-item">
              Thriller
            </span>
            <span onClick={handleSelectGenre} id="horror-movies" className="category-item">
              Horror
            </span>
            <span onClick={handleSelectGenre} id="comedy-movies" className="category-item">
              Comedy
            </span>
            <span onClick={handleSelectGenre} id="fantasy-movies" className="category-item">
              Fantasy
            </span>
            <span onClick={handleSelectGenre} id="adventure-movies" className="category-item">
              Adventure
            </span>
            <span onClick={handleSelectGenre} id="documentory-movies" className="category-item">
              Documentory
            </span>
            <span onClick={handleSelectGenre} id="classical-movies" className="category-item">
              Classical
            </span>
            <span onClick={handleSelectGenre} id="crime-movies" className="category-item">
              Crime
            </span>
            <span onClick={handleSelectGenre} id="animated-movies" className="category-item">
              Animated
            </span>
          </div>
        </div>
        <div id="category-right-slide">{">"}</div>
        <div id="category-left-slide">{"<"}</div>
      </div> */}

      {/* <!------ start main section -----> */}
      <div id="main">
        <div id="movie-container">
          {loading ? (
            <PreLoader />
          ) : (
            movies.map((movie, idx) => {
              return <MovieCard key={idx} movie={movie} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
