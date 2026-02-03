import express, {Request, Response} from 'express';

// Movie Model ref
import Movie from '../models/movie';

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
export const getMovies = async (req: Request, res: Response) => {
    // use model to fetch all movie document from mongodb
    const movies = await Movie.find();
    return res.status(200).json(movies);
}

//POST
export const createMovie = async (req: Request, res: Response) => {
    if (!req.body == null){
        return res.status(400).json({'error': 'Bad Request'}); // 400: Bad Request
    }
    // use Movie Model to save to db 
    await Movie.create(req.body);

    return res.status(201).json(); // 201: Resource Created
}

//PUT
export const updateMovie = async (req: Request, res: Response) => {
    // check if id is valid
    const movie = await Movie.findById(req.params.id);

    if(!movie){
        return res.status(404).json({'error': 'Movie not found'});
    }

    //find mongoose to update movie 
    await Movie.findByIdAndUpdate(req.params.id, req.body);

    return res.status(204).json(); //204:OK, No Content
    
}

//DELETE
export const deleteMovie = async (req: Request, res: Response) => {
    // check if the id is valid
    const movie = await Movie.findById(req.params.id);

    if(!movie){
        return res.status(404).json({'error': 'Movie not found'});
    }
    //use mongoose to delete movie based on id param in URL
    await Movie.findByIdAndDelete(req.params.id);


    return res.status(204).json(); //204: OK, no Content 

}