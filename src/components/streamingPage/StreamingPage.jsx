import React, { useState, useEffect, useRef } from "react";
import "./streamingPage.css";
import { useFetcher, useSearchParams } from "react-router-dom";
// icon
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { PiShareNetworkBold } from "react-icons/pi";
import { MdFavorite } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

// components
import Sidebar from "../sidebar/Sidebar";
import MovieCard from "../movieCard/MovieCard";
import Navbar from "../navbar/Navbar";
import StreamPlayer from "../streamPlayer/StreamPlayer";
import PreLoader from '../preLoader/PreLoader'

const StreamingPage = () => {
  const apiUrl = "http://localhost:7700";

  const [searchParams] = useSearchParams();

  // Extract query parameters from the URL
  const movieId = searchParams.get("id");
  const movieName = searchParams.get("name");

  // initialize ref
  // const videoCommentRef = useRef(null);
  const wrapperRef = useRef(null);
  const streamContPlayerRef = useRef(null);

  // initialize state
  const [streamingMovie, setStreamingMovie] = useState({});
  const [videoDescTextRefExpand, setVideoDescTextRefExpand] = useState(false);
  // const [videoCommentRefExpand, setVideoCommentRefExpand] = useState(false);
  const [wrapperRefWidth, setWrapperRefWidth] = useState("");
  const [streamContPlayerRefHeight, setStreamContPlayerRefHeight] =useState("");
  const [moreSuggestContent, setMoreSuggestContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [viewsType, setViewsType] = useState('');
  const [movieViews, setMovieViews] = useState(0);
  const [userInLocal, setUserInLocal] = useState(JSON.parse(localStorage.getItem('FlexxUser')));
  const [favListInLocal, setFavListInLocal] = useState(JSON.parse(localStorage.getItem('FlexxFavoritList'))||[]);
  // getStremMovie
  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      const res = await fetch(`${apiUrl}/movies/getStreamingMovie/${movieId}`);
      const result = await res.json();
      setStreamingMovie(result);
      if (res.ok) {
        setStreamingMovie(result);
      }
    };
    getMovieDetails();
  }, [movieId]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const streamContPlayer = streamContPlayerRef.current;
    const playercssObj = window.getComputedStyle(streamContPlayer, null);
    const wrappercssObj = window.getComputedStyle(wrapper, null);
    const wrapperWidthOut = wrappercssObj.getPropertyValue("width");
    const containerHeightOut = playercssObj.getPropertyValue("height");
    setWrapperRefWidth(wrapperWidthOut);
    setStreamContPlayerRefHeight(containerHeightOut);

    window.addEventListener("resize", () => {
      const wrapperWidth = wrappercssObj.getPropertyValue("width");
      setWrapperRefWidth(wrapperWidth);
    });

    return () => {};
  }, []);

  // get more suggest movie
  useEffect(() => {
    const getMoreSuggestMovie = async () => {
      setIsLoading(true)
      const res = await fetch(
        `${apiUrl}/movies/getMoreSuggestMovie/${movieId}`
      );
      const result = await res.json();
      setIsLoading(false)
      if (res.ok) {
        setMoreSuggestContent(result);
      }
    };
    getMoreSuggestMovie();
  }, [movieId]);

  // set like false or true
  useEffect(() => {
    const userHasLiked = streamingMovie.like?.some(ip => ip.ipAddress == userInLocal.ipAddress);
    setIsLike(userHasLiked);
  }, [streamingMovie.like,userInLocal.ipAddress]);
  // set is fav false or true
  useEffect(() => {
    const userHasFaved = favListInLocal?.some(movie => movie.id == movieId);
    setIsFav(userHasFaved);
  }, [favListInLocal]);
  
  // craete like functionality
  const handleLikeBtnClick = async ()=>{
    const res = await fetch(`${apiUrl}/movies/likeMovie/${movieId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({isLike:isLike,userIp:userInLocal.ipAddress})
      });

      if(res.status==200){
        setIsLike(!isLike)
      }

  }

  // handle favorit 
  const handleFavBtnClick = ()=>{
    if(!isFav){
    const flexxFavList = localStorage.setItem('FlexxFavoritList',JSON.stringify([...favListInLocal,{...streamingMovie,id:movieId}]))
    setIsFav(true)
    }else {
      // Remove item from the favorites list
      const updatedFavList = favListInLocal.filter(item => item.id !== movieId);
      localStorage.setItem('FlexxFavoritList', JSON.stringify(updatedFavList));
      setIsFav(false);
    }
  }

  // count video view
  useEffect(() => {
    const countViews = async () => {
      if (movieId && streamingMovie.video) {
        const res = await fetch(`${apiUrl}/movies/countViews/${movieId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ currentView: streamingMovie.views })
        });
      }
    }
    countViews();
  }, [streamingMovie?.video])

  // set views type
  useEffect(() => {
    const views = parseInt(streamingMovie.views);
    if(views<1000){
      setViewsType('')
      setMovieViews(views)
    };
    if(views>1000){
      let convertViews = views/1000;
      setMovieViews(convertViews)
      setViewsType('K')
    }
    if(views>1000000){
      let convertViews = views/1000000;
      setMovieViews(convertViews)
      setViewsType('M')
    };
    if(views>1000000000){
      let convertViews = views/1000000000;
      setMovieViews(convertViews)
      setViewsType('B')
    };
  }, [streamingMovie?.video])

  // set html head
  useEffect(() => {
    // Set the document title
    document.title = streamingMovie.title;

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', streamingMovie.description);
    } else {
      const newMetaDescription = document.createElement('meta');
      newMetaDescription.name = 'description';
      newMetaDescription.content = streamingMovie.description;
      document.head.appendChild(newMetaDescription);
    }

    // Set meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', streamingMovie.keywords?streamingMovie.keywords:'');
    } else {
      const newMetaKeywords = document.createElement('meta');
      newMetaKeywords.name = 'keywords';
      newMetaKeywords.content =streamingMovie.keywords?streamingMovie.keywords:'';
      document.head.appendChild(newMetaKeywords);
    }

    // Set author meta tag to your name

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

    // Cleanup function to reset document title and meta tags when component unmounts or dependencies change
    return () => {
      document.title = 'Default Title'; // Reset to default title
      if (metaDescription) metaDescription.setAttribute('content', 'Default description');
      if (metaKeywords) metaKeywords.setAttribute('content', 'default, keywords');
      if (metaRobots) metaRobots.setAttribute('content', 'noindex, nofollow');
    };
  }, [streamingMovie]);
  
  return (
    <div style={{backgroundImage:`url(${streamingMovie.poster})`}} id="stremingPage">
      <Navbar />
      {/* <Sidebar /> */}
      <div ref={wrapperRef} id="streaming_wrapper">
        <div id="streaming-container">
          {/* video */}
          <div ref={streamContPlayerRef} id="streamPlayer_container">
            {isLoading
            ?(<PreLoader/>)
            :(<StreamPlayer
              videoLink={streamingMovie.video}
              wrapperWidth={wrapperRefWidth}
              conatinerHeight={streamContPlayerRefHeight}
            />
            )
            }
          </div>
          {/* details */}
          <div id="strem_video_details">
            {/* title like favorit share */}
            <div id="svd_details_choice">
              <h2 id="stream_video_title">{streamingMovie.title}</h2>
              <div id="svd_user_choice">
                <p>
                  {movieViews} {viewsType} views                  
                </p>
                <button onClick={handleLikeBtnClick} id="stream_video_like">
                  {isLike?<AiFillLike/>:<AiOutlineLike />}
                </button>
                <button onClick={handleFavBtnClick} id="stream_video_fav">
                  <abbr title="Favorit">
                  {isFav?<MdFavorite/>:<MdFavoriteBorder />}
                  </abbr>
                </button>
                <button id="stream_video_share">
                  <PiShareNetworkBold />
                </button>
              </div>
            </div>
            {/* video genres */}
            <div id="stream_video_genres">
              {/* <p>
                <span style={{ color: "cyan" }}>durtaion: </span>
                <span>
                  {videoDurationInSec}{" "}
                  {videoDurationInSec < 60 ? " Sec" : " Min"}
                </span>
              </p> */}
              <p>
                <span style={{ color: "cyan" }}>genres: </span>
                <span>{streamingMovie.genre}</span>
              </p>
            </div>
            {/* description */}
            <div id="stream_video_description">
              <span
                id={`${
                  videoDescTextRefExpand
                    ? "stream_video_description_text_expand"
                    : "stream_video_description_text"
                }`}
              >
                {streamingMovie.description}
              </span>
              <span
                style={{ marginTop: `${videoDescTextRefExpand ? "10px" : ""}` }}
                onClick={() => {
                  setVideoDescTextRefExpand(!videoDescTextRefExpand);
                }}
                id="svd_text_seeBtn"
              >
                {videoDescTextRefExpand ? "Show Less" : "...more"}
              </span>
            </div>

            {/* comment */}
            {/* <div id="stream_video_comments">
              <h2
                onClick={() => {
                  setVideoCommentRefExpand(!videoCommentRefExpand);
                }}
                ref={videoCommentRef}
              >
                Comments
                <span>
                  {videoCommentRefExpand ? (
                    <FaChevronUp size={20} />
                  ) : (
                    <FaChevronDown size={20} />
                  )}
                </span>
              </h2>
              
              <div
                id={`${
                  videoCommentRefExpand
                    ? "stream_video_comments_expand"
                    : "stream_video_comments_not_expand"
                }`}
              >
                <div id="stream_video_comments_add">
                  <textarea
                    id="stream_video_comments_add_input"
                    placeholder="Add Your Comment..."
                  ></textarea>
                  <button>cancel</button>
                  <button>comment</button>
                </div>
                // comment list 
                <div id="stream_video_comments_list">
                  <div>
                    <h4 style={{ color: "white", fontSize: "21px" }}>
                      you name
                    </h4>
                    <p>my comment here how are you</p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        {/* more suggest */}
        <div style={{ padding: "10px" }}>
          <h2 style={{ color: "cyan" }}>More Suggestions</h2>
          {/* list */}
          {isLoading ? (
            <PreLoader/>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {moreSuggestContent.map((movie, idx) => {
                return <MovieCard key={idx} movie={movie} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StreamingPage;
