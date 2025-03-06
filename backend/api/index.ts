import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import apodRoutes from '../src/APOD/apodRoutes';
import libraryRoutes from '../src/Library/libraryRoutes';
import epicRoutes from '../src/EPIC/epicRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware.
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://astrolens-omega.vercel.app/'],
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  }),
);

// Routes.
app.use('/api', apodRoutes);
app.use('/api', libraryRoutes);
app.use('/api', epicRoutes);

// Start Server.
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});

module.exports = app;
