import express from 'express';
import {getSliders,getUpComings} from '../controller/mediaManageController.js'

const router = express.Router();


router.get('/get-sliders', getSliders);
router.get('/get-upcomings', getUpComings);

export default router