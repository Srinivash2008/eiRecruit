import {Router} from "express";
import { loginController } from "../controllers/authentication/authController.js";


// authendication controller here

const router = Router();

router.post("/loginUser",loginController); 


// export named router 
export const authUserRouter = router;