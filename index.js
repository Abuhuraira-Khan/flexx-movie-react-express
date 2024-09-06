import express from 'express';
import cors from 'cors';
import path from "path";

// import router
import moviesRoute from './routes/moviesRoutes.js';
import userRoute from './routes/userRoutes.js';
import mediaManageRoute from './routes/mediaManageRoutes.js';


const PORT = 7700;

const app = express();


app.use(express.json({limit:'1gb'}))
app.use(cors())
app.use(express.static(path.join(path.resolve(),'./frontend/dist')))

app.use('/movies',moviesRoute)
app.use('/user',userRoute)
app.use('/media-mng',mediaManageRoute)

app.get('*',(req,res)=>{
    res.sendFile(path.join(path.resolve(),'./frontend/dist/index.html'))
})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})