"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import {getMovies, createMovie, updateMovie, deleteMovie} from '../controllers/moviesController';
const moviesController_1 = require("../controllers/moviesController");
const router = express_1.default.Router();
// GET
router.get('/', moviesController_1.getMovies);
// POST
router.post('/', moviesController_1.createMovie);
// // PUT
// router.put('/:id', updateMovie);
// // DELETE
// router.delete('/:id', deleteMovie)
//MAKE ROUTER PUBLIC
exports.default = router;
