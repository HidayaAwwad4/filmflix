import connectDb  from '../DB/connection.js';
import authRouter from './Modules/auth/auth.router.js';
import adminRouter from './Modules/admin/admin.router.js';
import movieRouter from './Modules/movie/movie.router.js';
import commentRouter from "./Modules/comment/comment.router.js";
import movieRecommendationRouter from "./Modules/movieRecommendation/movieRecommendation.router.js";
import notificationRouter from "./Modules/notification/notification.router.js";
import ratingRouter from "./Modules/rating/rating.router.js";

const initApp = (app,express)=>{
    connectDb();
    app.use(express.json());
    app.use('/auth',authRouter);
    app.use('/admin',adminRouter);
    app.use('/movie',movieRouter);
    app.use('/comment',commentRouter);
    app.use('/movieRecommendation',movieRecommendationRouter);
    app.use('/notification',notificationRouter);
    app.use('/rating',ratingRouter);
    app.use('*',(req,res)=>{
        return res.status(404).json({message:"page not found"});
    });
    app.use((err,req,res,next)=>{
        return res.status(err.statusCode).json({message:err.message});
    });
}
export default initApp;