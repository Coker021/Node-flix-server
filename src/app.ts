import express, {Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import cookieParser from 'cookie-parser';


import moviesRouter from './routes/movieRoutes';
import usersRouter from './routes/usersRoutes';
import User from './models/user';

const app: Application = express();

// express app config
app.use(bodyParser.json()); // parse request body as JSON
app.use(cookieParser()); // needed to read cookies w/jwt in http requests

//mongodb connection
mongoose.connect(process.env.DB, {})
.then((response) => console.log('connected to MongoDB'))
.catch((error) => console.log(`Connection failed: ${error}`));

// passport config for auth
app.use(passport.initialize());

// defaults to local strategy => users in our own db
passport.use(User.createStrategy());

// session mgmt => read/write user data to / from session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// wt config
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PASSPORT_sECRET
};

const strategy = new Strategy(jwtOptions, async (jwtPayload, callback) => {
    try {
        // decrypt jwt and check contents
        const user = await User.findById(jwtPayload.id);

        if (!user) throw new Error('Invalid user id in token');

        return callback(null,user);
    }
    catch (error){
        // if error, return error but no user info
        return callback(error, null);
    }
});

passport.use(strategy);

app.listen(4000, () => {
    console.log('Express API running on port 4000')
});

// swgger api doc config
const options = {
    definition : {
        openapi: '3.0.0',
        info: {
            title: 'Nodeflix API',
            version: '1.0.0'
        }
    },
    apis: ['./dist/controllers/*.js'] // location of api methods
};

// create new document using options above
const openApiSpecs = swaggerJsDoc(options)
app.use('/api-docs', swaggerUi.serve)

// set url routing for swagger api docs
app.get('/api-docs', (req: Request, res: Response) => {
    const html: string = swaggerUi.generateHTML(openApiSpecs, {
        customCssUrl:'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        customJs: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js'
        ]
    });
    res.send(html)
});

// api routing
app.use('/api/v1/movies', moviesRouter);
app.use('/api/v1/users', usersRouter);



