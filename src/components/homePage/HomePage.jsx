import React from "react";
import "./homePage.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Sidebar from "../sidebar/Sidebar";
import MovieCard from "../movieCard/MovieCard";
import Navbar from "../navbar/Navbar";
import PreLoader from '../preLoader/PreLoader'

// icon
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const apiUrl = "http://localhost:7700";

  const navigate =useNavigate();

  // initialize state
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [animatedMovies, setAnimatedMovies] = useState([]);
  const [sliders,setSliders] = useState([]);
  const [topLiked, setTopLiked] = useState([]);
  const [topWatched, setTopWatched] = useState([]);
  const [comingSoon, setComingSoon] = useState([]);
  const [loading,setLoading] = useState(false);

  // gsap code here
  useGSAP(() => {

    if(!loading && sliders.length>=1){
    // menu div
    gsap.from("#menu", {
      x: -50,
    });

    // slider constainer
    gsap.from("#slider-container", {
      delay:0.3,
      height: 0,
      duration: 1,
    });

    gsap.from("#popular-title", {
      opacity: 0,
      y: -30,
      duration:0.3
    });

    gsap.from("#top-liked-movie, #top-watched-movie, #coming-soon-movie", {
      delay: 1,
      x: 700,
      stagger: 0.1,
    });

    gsap.to("#nav-header", {
      position: "fixed",
      top: 0,
      backgroundColor: "rgb(0,0,0,90%)",
      scrollTrigger: {
        trigger: "#nav-header",
        scroller: "body",
        scrub: true,
        start: "top -10%",
      },
    });
  }
  },[loading]);

  // slider and movie card slider code here
  useEffect(() => {
    if(!loading){
    const slideLeftBtn = document.querySelector("#slide-left-btn");
    const slideRightBtn = document.querySelector("#slide-right-btn");
    const sliderContent = document.querySelector("#slider-content");
    const sliderContentTlm = document.querySelector("#slider-tlm-content-sub");
    const sliderContentTwm = document.querySelector("#slider-twm-content-sub");
    const slides = document.querySelectorAll(".slider-big img");
    const slides_tlm = document.querySelectorAll(".slider-tlm img");
    const slides_twm = document.querySelectorAll(".slider-twm img");
    
    let currentIndex = 0;
    let currentIndexTlm = 0;
    let currentIndexTwm = 0;
    let sliderWidth = sliderContent.offsetWidth;
    let sliderWidthTlm = sliderContentTlm.offsetWidth;
    let sliderWidthTwm = sliderContentTwm.offsetWidth;
    
    const slideLeft = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider();
    };
    
    const slideRight = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    };
    
    const updateSlider = () => {
      const newPosition = -currentIndex * sliderWidth;
      sliderContent.style.transform = `translateX(${newPosition}px)`;
      sliderContent.style.transition = "0.5s";
    };
    
    const updateSliderTlm = () => {
      const newPositionTlm = -currentIndexTlm * sliderWidthTlm;
      sliderContentTlm.style.transform = `translateX(${newPositionTlm}px)`;
      sliderContentTlm.style.transition = "0.5s";
    };
    
    const updateSliderTwm = () => {
      const newPositionTwm = -currentIndexTwm * sliderWidthTwm;
      sliderContentTwm.style.transform = `translateX(${newPositionTwm}px)`;
      sliderContentTwm.style.transition = "0.5s";
    };
    
    // Auto slide
    const autoSlideInterval = setInterval(() => {
      slideRight();
    }, 4000);
    
    // Auto slide for TLM
    const autoSlideIntervalTlm = setInterval(() => {
      currentIndexTlm = (currentIndexTlm + 1) % slides_tlm.length;
      updateSliderTlm();
    }, 3000);
    
    // Auto slide for TWM
    const autoSlideIntervalTwm = setInterval(() => {
      currentIndexTwm = (currentIndexTwm + 1) % slides_twm.length;
      updateSliderTwm();
    }, 3000);    

    // Slide event listeners
    slideLeftBtn.addEventListener("click", slideLeft);
    slideRightBtn.addEventListener("click", slideRight);

    // Movie slide setup
    const sections = document.querySelectorAll(".section");

    sections.forEach((section) => {
      const slideLeftBtn = section.querySelector(".movie-left-arrow");
      const slideRightBtn = section.querySelector(".movie-right-arrow");
      const container = section.querySelector(".movie-container");
      const videos = container.querySelectorAll(".vdo");

      const videoWidth = videos[0]?.offsetWidth || 0; // Get width of the first video as reference

      // Calculate maximum scroll based on the container and its videos
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      // Variables for dragging
      let isDragging = false;
      let startX;
      let scrollLeft;

      // Scroll right
      slideRightBtn.addEventListener("click", () => {
        const newScrollLeft = container.scrollLeft + videoWidth;
        if (newScrollLeft <= maxScrollLeft) {
          container.scrollLeft = newScrollLeft;
        } else {
          container.scrollLeft = maxScrollLeft;
        }
      });

      // Scroll left
      slideLeftBtn.addEventListener("click", () => {
        const newScrollLeft = container.scrollLeft - videoWidth;
        if (newScrollLeft >= 0) {
          container.scrollLeft = newScrollLeft;
        } else {
          container.scrollLeft = 0;
        }
      });

      // Mouse and touch events for dragging
      container.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        container.style.cursor = "grabbing";
      });

      container.addEventListener("mouseleave", () => {
        isDragging = false;
        container.style.cursor = "grab";
      });

      container.addEventListener("mouseup", () => {
        isDragging = false;
        container.style.cursor = "grab";
      });

      container.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        container.scrollLeft = scrollLeft - walk;
      });

      // Touch events for mobile
      container.addEventListener("touchstart", (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      });

      container.addEventListener("touchend", () => {
        isDragging = false;
      });

      container.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        container.scrollLeft = scrollLeft - walk;
      });
    });

    return () => {
      // Clean up listeners
      sections.forEach((section) => {
        const slideLeftBtn = section.querySelector(".movie-left-arrow");
        const slideRightBtn = section.querySelector(".movie-right-arrow");
        const container = section.querySelector(".movie-container");

        slideLeftBtn.removeEventListener("click", slideLeft);
        slideRightBtn.removeEventListener("click", slideRight);
        container.removeEventListener("mousedown", () => {});
        container.removeEventListener("mouseleave", () => {});
        container.removeEventListener("mouseup", () => {});
        container.removeEventListener("mousemove", () => {});
        container.removeEventListener("touchstart", () => {});
        container.removeEventListener("touchend", () => {});
        container.removeEventListener("touchmove", () => {});
      });
    };
  }
  }, [movies, trendingMovies, animatedMovies,topLiked,topWatched]);

  // get latest movie
  useEffect(() => {
    const getLatestMovie = async () => {
      setLoading(true)
      const response = await fetch(`${apiUrl}/movies/latestMovie_H`);
      const result = await response.json();
      setLoading(false)
      setMovies(result);
      setAnimatedMovies(result.filter((movie) => movie.category === "animated"));
      setTrendingMovies(result.sort((a, b) => b.views - a.views));
      setTopLiked(result.sort((a, b) => b.like.length - a.like.length).slice(0,5))
      setTopWatched(result.sort((a, b) => b.views - a.views).slice(0,5))
    };
    getLatestMovie();
    return () => {
      setMovies([]);
      setAnimatedMovies([])
      setAnimatedMovies([])
    };
  }, []);

  // get slider
  useEffect(() => {
    const getSlider = async ()=>{
      const res = await fetch(`${apiUrl}/media-mng/get-sliders`);
      const result = await res.json();
      setSliders(result.filter(slider=>slider.section==='slider'));
      setComingSoon(result.filter(slider=>slider.section==='up coming').slice(0,1))
    }
    getSlider();
    return () => {
      setSliders([])
    }
  }, [])
  
  //  set html head
  useEffect(() => {
    // Set the document title
    document.title = 'Flexx - World';

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Watch Your Favorit Movies, Drama, Cartoon, Animated Film Free On Flexx');
    } else {
      const newMetaDescription = document.createElement('meta');
      newMetaDescription.name = 'description';
      newMetaDescription.content = 'Watch Your Favorit Movies, Drama, Cartoon, Animated Film Free On Flexx';
      document.head.appendChild(newMetaDescription);
    }

    // Set meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', "watch movies free, watch netflix movies on free, watch movie in hd, 1080p, 720p, 480p, 360p, watch disney movies on free, flexx, netflix, disney, watch english movies free, watch south indian movies free, watch hindi movies free, watch drama series free, watch cartoon free, watch animated movies free");
    } else {
      const newMetaKeywords = document.createElement('meta');
      newMetaKeywords.name = 'keywords';
      newMetaKeywords.content ="watch movies free, watch netflix movies on free, watch movie in hd, 1080p, 720p, 480p, 360p, watch disney movies on free, flexx, netflix, disney, watch english movies free, watch south indian movies free, watch hindi movies free, watch drama series free, watch cartoon free, watch animated movies free";
      document.head.appendChild(newMetaKeywords);
    }

    // Set robots meta tag
    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', 'index, follow');
    } else {
      const newMetaRobots = document.createElement('meta');
      newMetaRobots.name = 'robots';
      newMetaRobots.content = 'index, follow';
      document.head.appendChild(newMetaRobots);
    }
  }, [])
  

  return (
    <div id="homePage">
      <div id="body">

        {/* <!-------- start header section --------> */}
        <Navbar />
        {/* <!-------- start menu sidebar section --------> */}
        <Sidebar />

        {/* <!------- start main section --------> */}
        {loading
        ? (<PreLoader/>)

        :(<div id="main">
          {/* <!-------- start slider section --------> */}
          <div id="main-slider-sec">
            <div id="slider-container">
              <div id="slider-content">
                {sliders.map((slider,idx)=>{
                  return (
                    <div key={idx} className="slider-big">
                      <img src={slider.image} alt={`flexx slider ${idx}`} />
                    </div>
                  )
                })}
              </div>
              <span id="slide-left-btn">&lt;</span>
              <span id="slide-right-btn">&gt;</span>
            </div>

            {/* <!---- start slider section > popular section ----> */}
            <div id="popular-sec">
              <div id="popular-title">
                <h2>Popular</h2>
              </div>
              {/* top liked */}
              <div id="top-liked-movie">
                <h3>Top Liked</h3>
                <div id="top-liked-movie-content">
                  <div id="slider-tlm-content-sub">
                    {topLiked.map((movie, idx) => {
                      return (
                        <div key={idx} className="slider-tlm">
                          <img src={movie.poster} alt={movie.title} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              {/* top watched */}
              <div id="top-watched-movie">
                <h3>Top Watched</h3>
                <div id="top-watched-movie-content">
                  <div id="slider-twm-content-sub">
                    {topWatched.map((movie, idx) => {
                      return (
                        <div key={idx} className="slider-twm">
                          <img src={movie.poster} alt={movie.title} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              {/* coming soon */}
              <div id="coming-soon-movie">
                <h3>Coming soon</h3>
                <div id="coming-soon-movie-content">
                  {comingSoon.map((slider,idx)=>{
                    return (
                      <div key={idx} className="slider-csm">
                        <img src={slider.poster} alt='flexx up coming' />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div id="movie-section">
            {/* <!------ movie section > section 2 ------> */}
            <div id="section-1" className="section">
              <div className="title">
                <h2>Latest Movies</h2>
              </div>
              <div className="movie-container-before">
                <div className="movie-container">
                  {movies.slice(0, 10).map((movie, idx) => {
                    return <MovieCard key={idx} movie={movie} />;
                  })}
                </div>
                {/* <!------ movie left right slide arrow button ------> */}
                <button className="movie-left-arrow">
                  {<FaChevronLeft />}
                </button>
                <button className="movie-right-arrow">
                  {<FaChevronRight />}
                </button>
              </div>
            </div>

            {/* <!------ movie section > section 2 ------> */}
            <div id="section-2" className="section">
              <div className="title">
                <h2>Trending Movies</h2>
              </div>
              <div className="movie-container-before">
                <div className="movie-container">
                  {trendingMovies.slice(0, 10).map((movie, idx) => {
                    return <MovieCard key={idx} movie={movie} />;
                  })}
                </div>
                {/* <!------ movie left right slide arrow button ------> */}
                <button className="movie-left-arrow">
                  {<FaChevronLeft />}
                </button>
                <button className="movie-right-arrow">
                  {<FaChevronRight />}
                </button>
              </div>
            </div>
            {/* movie section */}
            <div id="section-3" className="section">
              <div className="title">
                <h2>Animated Movies</h2>
              </div>
              <div className="movie-container-before">
                <div className="movie-container">
                  {animatedMovies.map((movie, idx) => {
                    return <MovieCard key={idx} movie={movie} />;
                  })}
                </div>
                {/* <!------ movie left right slide arrow button ------> */}
                <button className="movie-left-arrow">
                  {<FaChevronLeft />}
                </button>
                <button className="movie-right-arrow">
                  {<FaChevronRight />}
                </button>
              </div>
            </div>
          </div>
        </div>
        )
        }

        <div id="footer">
          <div id="sub-footer">
            <div id="sub-footer-container-1" className="sub-footer-container">
              <div id="footer-logo">
                <h2>Flexx</h2>
              </div>
              <span onClick={()=>navigate('/contact-us')} id="sub-footer-contact">Contact Us</span>
            </div>
            <div id="sub-footer-container-2" className="sub-footer-container">
              <div id="footer-follow-sec">
                <h2>Follow</h2>
              </div>
              <i id="sub-footer-youtube-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FF3D00"
                    d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"
                  ></path>
                  <path fill="#FFF" d="M20 31L20 17 32 24z"></path>
                </svg>
              </i>
              <i id="sub-footer-twitter-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#212121"
                    fillRule="evenodd"
                    d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28	c2.209,0,4,1.791,4,4v28C42,40.209,40.209,42,38,42z"
                    clipRule="evenodd"
                  ></path>
                  <path
                    fill="#fff"
                    d="M34.257,34h-6.437L13.829,14h6.437L34.257,34z M28.587,32.304h2.563L19.499,15.696h-2.563 L28.587,32.304z"
                  ></path>
                  <polygon
                    fill="#fff"
                    points="15.866,34 23.069,25.656 22.127,24.407 13.823,34"
                  ></polygon>
                  <polygon
                    fill="#fff"
                    points="24.45,21.721 25.355,23.01 33.136,14 31.136,14"
                  ></polygon>
                </svg>
              </i>
              <i id="sub-footer-tiktok-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#212121"
                    fillRule="evenodd"
                    d="M10.904,6h26.191C39.804,6,42,8.196,42,10.904v26.191 C42,39.804,39.804,42,37.096,42H10.904C8.196,42,6,39.804,6,37.096V10.904C6,8.196,8.196,6,10.904,6z"
                    clipRule="evenodd"
                  ></path>
                  <path
                    fill="#ec407a"
                    fillRule="evenodd"
                    d="M29.208,20.607c1.576,1.126,3.507,1.788,5.592,1.788v-4.011 c-0.395,0-0.788-0.041-1.174-0.123v3.157c-2.085,0-4.015-0.663-5.592-1.788v8.184c0,4.094-3.321,7.413-7.417,7.413 c-1.528,0-2.949-0.462-4.129-1.254c1.347,1.376,3.225,2.23,5.303,2.23c4.096,0,7.417-3.319,7.417-7.413L29.208,20.607L29.208,20.607 z M30.657,16.561c-0.805-0.879-1.334-2.016-1.449-3.273v-0.516h-1.113C28.375,14.369,29.331,15.734,30.657,16.561L30.657,16.561z M19.079,30.832c-0.45-0.59-0.693-1.311-0.692-2.053c0-1.873,1.519-3.391,3.393-3.391c0.349,0,0.696,0.053,1.029,0.159v-4.1 c-0.389-0.053-0.781-0.076-1.174-0.068v3.191c-0.333-0.106-0.68-0.159-1.03-0.159c-1.874,0-3.393,1.518-3.393,3.391 C17.213,29.127,17.972,30.274,19.079,30.832z"
                    clipRule="evenodd"
                  ></path>
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M28.034,19.63c1.576,1.126,3.507,1.788,5.592,1.788v-3.157 c-1.164-0.248-2.194-0.856-2.969-1.701c-1.326-0.827-2.281-2.191-2.561-3.788h-2.923v16.018c-0.007,1.867-1.523,3.379-3.393,3.379 c-1.102,0-2.081-0.525-2.701-1.338c-1.107-0.558-1.866-1.705-1.866-3.029c0-1.873,1.519-3.391,3.393-3.391 c0.359,0,0.705,0.056,1.03,0.159V21.38c-4.024,0.083-7.26,3.369-7.26,7.411c0,2.018,0.806,3.847,2.114,5.183 c1.18,0.792,2.601,1.254,4.129,1.254c4.096,0,7.417-3.319,7.417-7.413L28.034,19.63L28.034,19.63z"
                    clipRule="evenodd"
                  ></path>
                  <path
                    fill="#81d4fa"
                    fillRule="evenodd"
                    d="M33.626,18.262v-0.854c-1.05,0.002-2.078-0.292-2.969-0.848 C31.445,17.423,32.483,18.018,33.626,18.262z M28.095,12.772c-0.027-0.153-0.047-0.306-0.061-0.461v-0.516h-4.036v16.019 c-0.006,1.867-1.523,3.379-3.393,3.379c-0.549,0-1.067-0.13-1.526-0.362c0.62,0.813,1.599,1.338,2.701,1.338 c1.87,0,3.386-1.512,3.393-3.379V12.772H28.095z M21.635,21.38v-0.909c-0.337-0.046-0.677-0.069-1.018-0.069 c-4.097,0-7.417,3.319-7.417,7.413c0,2.567,1.305,4.829,3.288,6.159c-1.308-1.336-2.114-3.165-2.114-5.183 C14.374,24.749,17.611,21.463,21.635,21.38z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </i>
              <i id="sub-footer-facebook-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#039be5"
                    d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                  ></path>
                </svg>
              </i>
              <i id="sub-footer-instagram-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <radialGradient
                    id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1"
                    cx="19.38"
                    cy="42.035"
                    r="44.899"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#fd5"></stop>
                    <stop offset=".328" stopColor="#ff543f"></stop>
                    <stop offset=".348" stopColor="#fc5245"></stop>
                    <stop offset=".504" stopColor="#e64771"></stop>
                    <stop offset=".643" stopColor="#d53e91"></stop>
                    <stop offset=".761" stopColor="#cc39a4"></stop>
                    <stop offset=".841" stopColor="#c837ab"></stop>
                  </radialGradient>
                  <path
                    fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)"
                    d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                  ></path>
                  <radialGradient
                    id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2"
                    cx="11.786"
                    cy="5.54"
                    r="29.813"
                    gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#4168c9"></stop>
                    <stop
                      offset=".999"
                      stopColor="#4168c9"
                      stopOpacity="0"
                    ></stop>
                  </radialGradient>
                  <path
                    fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)"
                    d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
                  ></path>
                  <circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle>
                  <path
                    fill="#fff"
                    d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
                  ></path>
                </svg>
              </i>
            </div>
            {/* <div id="sub-footer-container-3" className="sub-footer-container">
              <div id="footer-legal-sec">
                <h2>Legal</h2>
              </div>
              <span id="sub-footer-privacy-policy">Privacy Policy</span>
              <span id="sub-footer-terms-condi">Terms & Condition</span>
              <span id="sub-footer-faq">FAQ</span>
            </div> */}
          </div>
          {/* <div id="last-footer">
            &copy; <span id="last-footer-year"></span> Flexx All Rights Resarved
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
