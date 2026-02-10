import express, {Router} from 'express';

import {getMovies, createMovie, updateMovie, deleteMovie, createReview} from '../controllers/moviesController';
// import {getMovies, createMovie} from '../controllers/moviesController';

const router: Router = express.Router();

// GET
router.get('/', getMovies);

// POST
router.post('/', createMovie);

// PUT
router.put('/:id', updateMovie);

// DELETE
router.delete('/:id', deleteMovie);

// POST
router.post('/:id/reviews', createReview)

//MAKE ROUTER PUBLIC
export default router;

