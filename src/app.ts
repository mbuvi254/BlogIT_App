import "dotenv/config";
import express,{type Express,type Request,type Response} from 'express';
import userRouter from "./routes/userRoutes.js";


const app: Express= express();
app.use(express.json());

app.get('/',(req:Request,res:Response)=>{
    res.send('BlogIT App is running');
});

app.use('/users',userRouter);




const PORT:number= Number(process.env.PORT);

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});