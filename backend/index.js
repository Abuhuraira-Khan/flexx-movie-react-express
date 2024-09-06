import express from 'express';
import { configDotenv } from 'dotenv';
import cors from 'cors'

// import router
import moviesRoute from './routes/moviesRoutes.js';
import userRoute from './routes/userRoutes.js';
import mediaManageRoute from './routes/mediaManageRoutes.js';

// initialize dotenv
configDotenv();
const PORT = process.env.PORT || 8800;

const app = express();

app.use(express.json({limit:'1gb'}))
app.use(cors())
app.use('/movies',moviesRoute)
app.use('/user',userRoute)
app.use('/media-mng',mediaManageRoute)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})