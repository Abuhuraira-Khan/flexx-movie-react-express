import React, { useEffect,useState } from 'react';
import { FormspreeProvider } from '@formspree/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/homePage/HomePage';
import MoviePage from './components/moviePage/MoviePage';
import StreamingPage from './components/streamingPage/StreamingPage';
// import ProfilePage from './components/profilePage/ProfilePage';
import UpComing from './components/upComing/UpComing';
import SearchPage from './components/SearchPage';
import PreLoader from './components/preLoader/PreLoader';
import ContactUS from './components/contactUs/ContactUS';
import {SidebarOC} from './Context';

const App = () => {
  const apiUrl = "http://localhost:7700";

  // craete user in localhost
  useEffect(() => {
    const getUser = async ()=>{
      const response = await fetch(`${apiUrl}/user/getUser`);
      const Ipdata = await response.json();
      const flexxFavList = localStorage.setItem('FlexxUser',JSON.stringify({
        ipAddress:Ipdata
      }))
    }
    getUser();
  }, [])

  const [sidebarOC, setSidebarOC] = useState(false);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/l',
      element: <PreLoader />,
    },
    {
      path: '/movie',
      element: <MoviePage />,
    },
    // {
    //   path: '/profile',
    //   element: <ProfilePage favList={favListInLocal} user={flexxUser} />,
    // },
    {
      path: '/kids',
      element:<MoviePage/>
    },
    {
      path: '/drama-series',
      element:<MoviePage/>
    },
    {
      path: '/watch',
      element: <StreamingPage />,
    },
    {
      path: '/all',
      element: <MoviePage />,
    },
    {
      path:'/up-coming',
      element:<UpComing/>
    },
    {
      path:'/search',
      element:<SearchPage/>
    },
    {
      path:'/contact-us',
      element:<ContactUS/>
    }
  ])

  useEffect(() => {
  
    if(window.innerWidth > 768){
      setSidebarOC(true)
    }

    window.addEventListener('resize',()=>{
      if(window.innerWidth > 768){
        setSidebarOC(true)
      }
    })
  
    return () => {
      setSidebarOC()
    }
  }, [])

  return (
    <SidebarOC.Provider value={{sidebarOC,setSidebarOC}}>
    <FormspreeProvider project='2547708598528507328'>
    <div>
      <RouterProvider router={router}/>
    </div>
    </FormspreeProvider>
    </SidebarOC.Provider>
  )
}

export default App
