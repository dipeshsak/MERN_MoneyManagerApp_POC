import express from 'express';
import { login, signin } from '../controller/user.controller.js';

const router = express.Router();


// SIGNIN
router.post("/signin",signin)

// Login
router.post("/login",login)

export default router;