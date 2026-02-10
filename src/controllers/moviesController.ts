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

/**  
* @swagger
* /api/v1/movies:
*   get:
*      summary: Retrieve all movies
*      responses:
*          200:
*             description: A list of movies
*          404:
*             description: No movies found
*/
// GET
export const getMovies = async (req: Request, res: Response) => {
    // check url for any filter parameters using req.query proprty(any keys/values after ?)
    // example: /movies? genre-Comedy
    const filter = req.query;

    // use model to fetch all movie document from mongodb
    const movies = await Movie.find(filter);
    // if no movies found
    if (movies.length === 0){
        return res.status(404).json({error: 'No movies found'});
    }
    return res.status(200).json(movies);
}

/**
* @swagger
* /api/v1/movies:
*   post:
*     summary: Create a new movie
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               title:
*                 required: true
*                 type: string
*               year:
*                 required: true
*                 type: number
*     responses:
*       201:
*         description: Movie created
*       400:
*         description: Bad request
*/
export const createMovie = async (req: Request, res: Response) => {
    if (!req.body == null){
        return res.status(400).json({'error': 'Bad Request'}); // 400: Bad Request
    }
    // use Movie Model to save to db 
    await Movie.create(req.body);

    return res.status(201).json(); // 201: Resource Created
}

/**
* @swagger
* /api/v1/movies/{id}:
*   put:
*     summary: Update a movie based on id param in url
*     paremeters:
*       -name: id
*        in: path
*        required: true
*        schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               title:
*                 required: true
*                 type: string
*               year:
*                 required: true
*                 type: number
*     responses:
*       204:
*         description: Updated, no content
*       400:
*         description: Movie not found
*/
export const updateMovie = async (req: Request, res: Response) => {
    // check if id is valid
    const movie = await Movie.findById(req.params.id);

    if(!movie){
        return res.status(404).json({'error': 'Movie not found'});
    }
    try{
        movie.set(req.body);
        await movie.save();

        return res.status(204).json(); //204:OK, No Content
    }
    catch (error){
        return res.status(400).json({error: error.message});
    }
};

/**
* @swagger
* /api/v1/movies/{id}:
*   delete:
*     summary: Delete a movie based on id param in url
*     paremeters:
*       -name: id
*        in: path
*        required: true
*        schema:
*           type: string
*     responses:
*       204:
*         description: Deleted, no content
*       400:
*         description: Movie not found
*/
export const deleteMovie = async (req: Request, res: Response) => {
    // check if the id is valid
    const movie = await Movie.findById(req.params.id);

    if(!movie){
        return res.status(404).json({'error': 'Movie not found'});
    }
    //use mongoose to delete movie based on id param in URL
    await Movie.findByIdAndDelete(req.params.id);


    return res.status(204).json(); //204: OK, no Content 

};

export const createReview = async(req: Request, res: Response) =>{
    // retrieve movie id from url param
    const id: string = req.params.id.toString();

    // fetch selected movie
    const movie = await Movie.findById(id);
    // verify movie found
    if (!movie){
        return res.status(404).json({'error': 'Movie not found'});
    }

    try{
        // use push() to add subdocument array
        movie.reviews.push({
            ...req.body,
            date: new Date()
    });
    await movie.save();

    // return
    return res.sendStatus(204); 
    }
    catch (error){
        return res.status(400).json({error: error.message});
    }
};
    