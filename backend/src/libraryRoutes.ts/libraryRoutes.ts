import express, { Request, Response, Router } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router: Router = express.Router();
const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_LIBRARY_URL = process.env.LIBRARY_URL;

/*
    GET resources from the NASA image library.
*/
router.get(
  '/library',
  async (request: Request, response: Response): Promise<void> => {
    try {
      if (typeof NASA_API_KEY !== 'string') {
        throw new Error('API key is not set.');
      }

      const queryParams: string = new URLSearchParams({
        api_key: NASA_API_KEY,
        ...request.query,
      }).toString();

      const res: globalThis.Response = await fetch(
        `${NASA_LIBRARY_URL}?${queryParams}`,
      );

      if (!res.ok) {
        throw new Error(
          `Internal server error ${res.status}: ${res.statusText}`,
        );
      }

      const responseData = await res.json();
      response.status(200).json(responseData);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  },
);

export default router;
