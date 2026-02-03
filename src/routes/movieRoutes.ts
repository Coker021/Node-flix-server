import express, {Router} from 'express';

import {getMovies, createMovie, updateMovie, deleteMovie} from '../controllers/moviesController';
// import {getMovies, createMovie} from '../controllers/moviesController';

const router: Router = express.Router();

// GET
router.get('/', getMovies);

// POST
router.post('/', createMovie);

// PUT
router.put('/:id', updateMovie);

// DELETE
router.delete('/:id', deleteMovie)

//MAKE ROUTER PUBLIC
export default router;

