import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import apodRoutes from '../src/APOD/apodRoutes';
import libraryRoutes from '../src/Library/libraryRoutes';
import epicRoutes from '../src/EPIC/epicRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', apodRoutes);
app.use('/api', libraryRoutes);
app.use('/api', epicRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
