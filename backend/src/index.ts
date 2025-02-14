import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import apodRoutes from './APOD/apodRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api', apodRoutes);

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
