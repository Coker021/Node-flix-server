"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moviesController_1 = require("../controllers/moviesController");
// import {getMovies, createMovie} from '../controllers/moviesController';
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// public methods
// GET
router.get('/', moviesController_1.getMovies);
// GET
router.get('/:id', moviesController_1.getMovie);
// private methods
// POST
router.post('/', auth_1.verifyToken, moviesController_1.createMovie);
// PUT
router.put('/:id', auth_1.verifyToken, moviesController_1.updateMovie);
// DELETE
router.delete('/:id', auth_1.verifyToken, moviesController_1.deleteMovie);
// POST
router.post('/:id/reviews', auth_1.verifyToken, moviesController_1.createReview);
//MAKE ROUTER PUBLIC
exports.default = router;
