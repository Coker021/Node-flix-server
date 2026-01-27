"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.createMovie = exports.getMovies = void 0;
let movies = [
    { id: 1, title: 'The Shining', year: 1980 },
    { id: 2, title: 'Weapons', year: 2025 },
    { id: 3, title: '28 Years Later', year: 2025 },
    { id: 4, title: 'Deadpool and Wolverine', year: 2024 }
];
const getMovies = (req, res) => {
    return res.status(200).json(movies);
};
exports.getMovies = getMovies;
//POST
const createMovie = (req, res) => {
    if (!req.body == null) {
        return res.status(400).json({ 'error': 'Bad Request' }); // 400: Bad Request
    }
    // add new movie to array from request body
    movies.push(req.body);
    return res.status(201).json(); // 201: Resource Created
};
exports.createMovie = createMovie;
//PUT
const updateMovie = (req, res) => {
    //find movie in array by id
    const index = movies.findIndex(m => m.id == req.params.id);
    if (index === -1) {
        return res.status(404).json({ 'error': 'Not found' });
    }
    movies[index].title = req.body.title;
    movies[index].year = req.body.year;
    return res.status(204).json(); //204:OK, No Content
};
exports.updateMovie = updateMovie;
//DELETE
const deleteMovie = (req, res) => {
    //find movie in array by id
    const index = movies.findIndex(m => m.id == req.params.id);
    if (index === -1) {
        return res.status(404).json({ 'error': 'Not found' });
    }
    movies.splice(index, 1);
    return res.status(204).json(); //204: OK, no Content 
};
exports.deleteMovie = deleteMovie;
