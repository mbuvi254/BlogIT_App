import "dotenv/config";
import express, {} from 'express';
import userRouter from "./routes/userRoutes.js";
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('BlogIT App is running');
});
app.use('/users', userRouter);
const PORT = Number(process.env.PORT);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map