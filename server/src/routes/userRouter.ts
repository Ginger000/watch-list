import express, { Router } from "express";
import { registerNewUser } from "../controllers/userController";

const router:Router = express.Router()

router.route('/register').post(registerNewUser)

export default router