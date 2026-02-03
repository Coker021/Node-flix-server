import express, {Application } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';


import moviesRouter from './routes/movieRoutes';

const app: Application = express();

// express app config
app.use(bodyParser.json()); //

//mongodb connection
mongoose.connect(process.env.DB, {})
.then((response) => console.log('connected to MongoDB'))
.catch((error) => console.log(`Connection failed: ${error}`));

app.listen(4000, () => {
    console.log('Express API running on port 4000')
});

app.use('/api/v1/movies', moviesRouter);



