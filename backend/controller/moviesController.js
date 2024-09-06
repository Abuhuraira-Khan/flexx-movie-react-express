import firebaseApp from '../firebaseConfig.js';
import os, { hostname } from 'os';
import { getFirestore,doc,query,updateDoc,where,getDocs,getDoc,arrayRemove,arrayUnion,collection, increment } from "firebase/firestore";

const db = getFirestore(firebaseApp);
const coll = collection(db,'movies')

// get all movies
export const getAllMovies = async (req, res) => {
    const reqPath =req.params.pathAdress;// This should be the category name or identifier
    const currentLength = req.params.length;

    let pathAdress =reqPath;

    if(reqPath==='kids'){
     pathAdress ='animated'; 
    }
    else if(reqPath==='drama-series'){
        pathAdress ='drama/series';
    }


    try {
        if(reqPath==='all'){
            const data = await getDocs(coll);
            const movies = data.docs.map((doc) => ({ ...doc.data(), id: doc.id
            }));

            const movieLengthInDB = movies.length;

            if(currentLength<movieLengthInDB) {   

        res.status(200).json(movies.slice(currentLength,currentLength+15))
            }
        }else{
        // Reference to the movies collection
        const moviesCollection = collection(db, 'movies');

        // Create a query to filter movies by category
        const q = query(moviesCollection, where('category', '==', pathAdress));

        // Get the documents from Firestore
        const querySnapshot = await getDocs(q);

        // Map the documents to an array of movie objects
        const movies = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }));

        const movieLengthInDB = movies.length;
        // Send the movies as a JSON response
        if(currentLength<movieLengthInDB) {   

            res.status(200).json(movies.slice(currentLength,currentLength+15))
        }
    }
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json([]);
    }
};

// get streaming movie
export const getStreamingMovie = async (req, res) => {
    const id = req.params.id;
    const docRef = doc(db,'movies', id)
    try {
       const docSnap = await getDoc(docRef);
       if (docSnap.exists()) {
        const movie = docSnap.data();
        res.status(200).json(movie);
    } else {
        res.status(404).json({ error: 'No such document!' });
    }
} catch (error) {
    console.error('Error fetching document:', error); // Log the error
    res.status(500).json({ error: 'Internal Server Error' });
}
};

//  get more suggest movie
export const getMoreSuggestMovie = async (req,res)=>{
    const {movieId} = req.params;
    const docRef = doc(db,'movies', movieId)
    let streamMovie = {};
    try {
        
        // get stream movie
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
        const movie = docSnap.data();
        streamMovie={...movie}
        }

        // get suggest mvie
        const moviesCollection = collection(db, 'movies');

        // Create a query to filter movies by category
        const q = query(
            moviesCollection,
            where('category', '==', streamMovie.category),
            where('genre', '==',streamMovie.genre),
            // where('id', '!=' ,movieId)
          );

        // Get the documents from Firestore
        const querySnapshot = await getDocs(q);

        // Map the documents to an array of movie objects
        const movies = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }));

        // Send the movies as a JSON response
            res.status(200).json(movies.slice(0,15))
    } catch (error) {
        console.error('Error fetching documents:', error); // Log the error
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// set like system
export const likeMovie = async (req, res) => {
    const movieId = req.params.videoId;
    const {isLike,userIp} = req.body;  // Assuming this is a boolean indicating like or unlike
    const likedUser = {
      ipAddress: userIp,
    };

    try {
      const docRef = doc(db,'movies',movieId);

      if(!isLike&&userIp){
      await updateDoc(docRef, {
        like:arrayUnion({...likedUser})
        });
        res.status(200).json('liked')
      }
      else if (isLike){
        await updateDoc(docRef, {
          like:arrayRemove(likedUser)
        });
        res.status(200).json('unliked')
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
    }



};

// latest movie in homepage
export const getLatestMovie = async (req, res) => {
    try {
        const data = await getDocs(coll);
        const movies = data.docs.map((doc) => ({ ...doc.data(), id: doc.id
            }));
    res.status(200).json(movies)
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

// search movie
export const searchMovie = async (req, res) => {
    const query = req.query.q;

    try {
        const data = await getDocs(coll);
        const allMovies = data.docs.map((doc) => ({ ...doc.data(), id: doc.id
        }));

        const regex = new RegExp(query,'i');
        const movies = allMovies.filter(movie=>regex.test(movie.title))

        res.status(200).json(movies)

    } catch (error) {
        console.log(error)
        res.status(500).json('internal server error')
    }

}

//  count view 
export const countViews = async (req,res)=>{
    const {id} = req.params;
    const {currentView} = req.body;

    try {
        const docRef = doc(db,'movies',id);
        await updateDoc(docRef,{
            views:increment(1)
        })
        res.status(200)
    } catch (error) {
        console.log(error)
    }

}