"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moviesController_1 = require("../controllers/moviesController");
// import {getMovies, createMovie} from '../controllers/moviesController';
const router = express_1.default.Router();
// GET
router.get('/', moviesController_1.getMovies);
// POST
router.post('/', moviesController_1.createMovie);
// PUT
router.put('/:id', moviesController_1.updateMovie);
// DELETE
router.delete('/:id', moviesController_1.deleteMovie);
// GET
router.get('/:id', moviesController_1.getMovie);
// POST
router.post('/:id/reviews', moviesController_1.createReview);
//MAKE ROUTER PUBLIC
exports.default = router;
