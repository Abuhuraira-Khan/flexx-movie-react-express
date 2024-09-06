import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./movieCard.css";

gsap.registerPlugin(ScrollTrigger);

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Animation using GSAP and ScrollTrigger
    gsap.to(".vdo", {
      scale:1,
      opacity: 1,
      scrollTrigger: {
        trigger: ".vdo",
        scroller: "body",
        start: "top 95%", // Start animation when the top of .vdo hits 95% of the viewport
        end: "top 95%", // End animation when the bottom of .vdo hits 95% of the viewport
        scrub: 3,
      },
    });
  }); // Dependency array to run effect when 'movie' changes

  const handleClick = (movie) => {
    navigate(`/watch?id=${movie.id}&name=${movie.title}`, { replace: true });
  };

  return (
    <div onClick={() => handleClick(movie)} className="vdo">
      <div className="sub-vdo">
        <img src={movie.poster} alt={movie.title} />
        <div className="vdo-about">
          <span className="movie-play-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
            </svg>
          </span>
          <br />
          <br />
          <br />
          <h5 className="movie-name">
            <span>{movie.title}</span> -{" "}
            <span className="movie-year">{movie.releaseDate}</span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
