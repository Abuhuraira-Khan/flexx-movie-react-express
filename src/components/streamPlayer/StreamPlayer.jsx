// StreamPlayer.js
import React, { useEffect, useState } from 'react';

const StreamPlayer = ({videoLink,wrapperWidth, conatinerHeight}) => {
  // const [showAd, setShowAd] = useState(false);

  // useEffect(() => {
  //   const adIntervals = [10000, 20000, 30000]; // Times in milliseconds
  //   adIntervals.forEach((interval, index) => {
  //     setTimeout(() => setShowAd(true), interval);
  //     setTimeout(() => setShowAd(false), interval + 5000); // Show ad for 5 seconds
  //   });
  // }, []);

  return (
    <div style={{ position: 'relative', width:wrapperWidth, height:conatinerHeight }}>
      {!videoLink
      ?(<h2 style={{color:'#c71414',textAlign:'center'}}>Internal Server Error <br /> Video Not Found</h2>)
      :(<iframe
        width={wrapperWidth}
        height={conatinerHeight}
        src={videoLink}
        scrolling="no"
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>)
    }
          {/* <AdOverlay showAd={showAd} onClose={() => setShowAd(false)} /> */}
    </div>
  );
};

export default StreamPlayer;
