import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";

export const VideoCard = ({movie}) => {

  const styles = {
    container: {
      width: "100%",
      height: "100%",
      position: "relative",
      backgroundColor: "#111",
      color: "white",
    },
    container_wrapper: {
      width: "100%",
      height: "100%",
      position: "relative",
      display: "flex",
      gap:'10px'
    },
    video: {
      width: "400px",
      height: "250px",
    },
    details: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      padding:'10px'
    },
  };
 
  return (
    <div style={styles.container} className="video-card">
      <div style={styles.container_wrapper}>
        <video style={styles.video} poster={movie.poster} controls={true} src={movie.video}></video>
        <div style={styles.details}>
          <h2 style={{color:'#c71414'}}>{movie.title}</h2>
          <p>{movie.releseYear}</p>
          <p style={{maxHeight:'100px',overflowY:'auto',scrollbarWidth:'none'}}>{movie.description}</p>
        </div>
      </div>
    </div>
  );
};




const UpComing = () => {

  const apiUrl = "http://localhost:7700";

  const [upComings, setUpComings] = useState([])

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
      width: "60%",
      marginLeft: "50%",
      transform: "translate(-50%, 0%)",
      marginTop: "10px",
      backgroundColor: "rgb(0, 0, 0,90%)",
      padding: "10px",
      minHeight: "100vh",
    },
  };

  //  get up coming movie
  useEffect(() => {
    const getUpcomingMovie = async () => {
      const res = await fetch(`${apiUrl}/media-mng/get-upcomings`);
      const data = await res.json();
      setUpComings(data);
    }
    getUpcomingMovie();
    return () => {
      setUpComings([])
    }
  }, [])


  return (
    <div>
        <Navbar/>
        <Sidebar/>
      <div id="upComingPage_wrapper">
        <div style={styles.main}>
          <div style={styles.container}>
            {upComings.map((movie,idx)=>{
              return(
                <VideoCard key={idx} movie={movie} />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpComing;
