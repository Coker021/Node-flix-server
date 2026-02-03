"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMovie = exports.getMovies = void 0;
// Movie Model ref
const movie_1 = __importDefault(require("../models/movie"));
// interface Movie{
//     id: number;
//     title: string;
//     year: number;
// }
// let movies :Movie[] = [
//     { id: 1, title: 'The Shining', year: 1980 },
//     { id: 2, title: 'Weapons', year: 2025 },
//     { id: 3, title: '28 Years Later', year: 2025 },
//     { id: 4, title: 'Deadpool and Wolverine', year: 2024 }
// ];
// GET
const getMovies = async (req, res) => {
    // use model to fetch all movie document from mongodb
    const movies = await movie_1.default.find();
    return res.status(200).json(movies);
};
exports.getMovies = getMovies;
//POST
const createMovie = async (req, res) => {
    if (!req.body == null) {
        return res.status(400).json({ 'error': 'Bad Request' }); // 400: Bad Request
    }
    // use Movie Model to save to db 
    await movie_1.default.create(req.body);
    return res.status(201).json(); // 201: Resource Created
};
exports.createMovie = createMovie;
// //PUT
// export const updateMovie = (req: Request, res: Response) => {
//     //find movie in array by id
//     const index: number = movies.findIndex(m => m.id == req.params.id);
//     if (index === -1){
//         return res.status(404).json({'error': 'Not found'});
//     }
//     movies[index].title = req.body.title;
//     movies[index].year = req.body.year;
//     return res.status(204).json(); //204:OK, No Content
// }
// //DELETE
// export const deleteMovie = (req: Request, res: Response) => {
//     //find movie in array by id
//     const index: number = movies.findIndex(m => m.id == req.params.id);
//     if (index === -1){
//         return res.status(404).json({'error': 'Not found'});
//     }
//     movies.splice(index, 1);
//     return res.status(204).json(); //204: OK, no Content 
// }
