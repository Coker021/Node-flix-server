import express, {Application } from 'express';
import bodyParser from 'body-parser';


import moviesRouter from './routes/movieRoutes';

const app: Application = express();

app.use(bodyParser.json());

app.listen(4000, () => {
    console.log('Express API running on port 4000')
});

app.use('/api/v1/movies', moviesRouter);



