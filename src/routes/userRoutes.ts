import express,{type Request,type Response,type Router} from 'express';
import {registerUser ,getAllUsers} from '../controllers/userController.js';

const userRouter:Router =express.Router();

// User Registration Route
userRouter.post('/register',registerUser);


//User CRUD
userRouter.get('/',getAllUsers)

export default userRouter;