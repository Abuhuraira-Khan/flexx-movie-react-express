import express from 'express';
import { getAllMovies,getStreamingMovie,getMoreSuggestMovie,likeMovie,getLatestMovie,searchMovie,countViews } from '../controller/moviesController.js';

const router = express.Router();

router.get('/getAllMovies/:pathAdress/:length', getAllMovies);
router.get('/getStreamingMovie/:id', getStreamingMovie);
router.get('/getMoreSuggestMovie/:movieId', getMoreSuggestMovie);
router.post('/likeMovie/:videoId',likeMovie);
router.get('/latestMovie_H',getLatestMovie);
router.get('/searchMovie',searchMovie)
router.post('/countViews/:id',countViews)

export default router