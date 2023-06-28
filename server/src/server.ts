import dotenv from 'dotenv'
dotenv.config()
import express, {Express, Request, Response} from 'express'
import path from 'path'
import cors from 'cors'
import corsOptions from './config/corsOptions'
import { logger } from './middleware/logEvent'
import errorHandler from './middleware/errorHandler'
import verifyJWT from './middleware/verifyJWT'
import cookieParser from 'cookie-parser'
import credentials from './middleware/credentials'

import mongoose from 'mongoose'
import connectDB from './config/dbConn'

import userRouter from './routes/userRouter'

const app:Express = express()
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

// custom middleware logger
//app.use(logger)

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());


app.get('/', (req:Request, res:Response)=>{
  res.send('Hello, World')
})

app.use('/user', userRouter )

app.all('*', (req: Request, res: Response) => {
  res.status(404);
  if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
      res.json({ "error": "404 Not Found" });
  } else {
      res.type('txt').send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

/* 
 This order of operations is important to ensure that the server only starts accepting requests once it has successfully connected to the database.
*/