import { register, logout, login } from "../controllers/usersController";
import express, { Router } from 'express';

const router: Router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout)

export default router;

