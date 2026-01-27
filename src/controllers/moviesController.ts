import express, {Request, Response} from 'express';

interface Movie{
    id: number;
    title: string;
    year: number;
}

let movies :Movie[] = [
    { id: 1, title: 'The Shining', year: 1980 },
    { id: 2, title: 'Weapons', year: 2025 },
    { id: 3, title: '28 Years Later', year: 2025 },
    { id: 4, title: 'Deadpool and Wolverine', year: 2024 }
];


export const getMovies = (req: Request, res: Response) => {
    return res.status(200).json(movies);
}

//POST
export const createMovie = (req: Request, res: Response) => {
    if (!req.body == null){
        return res.status(400).json({'error': 'Bad Request'}); // 400: Bad Request
    }
    // add new movie to array from request body
    movies.push(req.body);

    return res.status(201).json(); // 201: Resource Created
}

//PUT
export const updateMovie = (req: Request, res: Response) => {
    //find movie in array by id
    const index: number = movies.findIndex(m => m.id == req.params.id);

    if (index === -1){
        return res.status(404).json({'error': 'Not found'});
    }

    movies[index].title = req.body.title;
    movies[index].year = req.body.year;

    return res.status(204).json(); //204:OK, No Content
    
}

//DELETE
export const deleteMovie = (req: Request, res: Response) => {
    //find movie in array by id
    const index: number = movies.findIndex(m => m.id == req.params.id);

    if (index === -1){
        return res.status(404).json({'error': 'Not found'});
    }

    movies.splice(index, 1);
    return res.status(204).json(); //204: OK, no Content 

}