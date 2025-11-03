import express, {} from 'express';
import { registerUser, getAllUsers } from '../controllers/userController.js';
const userRouter = express.Router();
// User Registration Route
userRouter.post('/register', registerUser);
//User CRUD
userRouter.get('/', getAllUsers);
export default userRouter;
//# sourceMappingURL=userRoutes.js.map