import express, {Router} from 'express';

import {getMovies, createMovie, updateMovie, deleteMovie, getMovie, createReview} from '../controllers/moviesController';
// import {getMovies, createMovie} from '../controllers/moviesController';
import { verifyToken } from '../middleware/auth';

const router: Router = express.Router();

// public methods
// GET
router.get('/', getMovies);

// GET
router.get('/:id', getMovie);

// private methods
// POST
router.post('/', verifyToken, createMovie);

// PUT
router.put('/:id', verifyToken, updateMovie);

// DELETE
router.delete('/:id', verifyToken, deleteMovie);

// POST
router.post('/:id/reviews', verifyToken, createReview)

//MAKE ROUTER PUBLIC
export default router;

