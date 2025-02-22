import express, { Request, Response, Router } from 'express';
import { z } from 'zod';
import dotenv from 'dotenv';
import { EpicApiResponseSchema, EpicQueryParamsSchema } from './types';

dotenv.config();
const router: Router = express.Router();
const EPIC_API_URL = process.env.EPIC_URL;

/*
  GET data from the Earth Polychromatic Imaging Camera (EPIC) API.
*/
router.get(
  '/epic',
  async (request: Request, response: Response): Promise<void> => {
    try {
      if (typeof EPIC_API_URL !== 'string') {
        throw new Error('URL is not set.');
      }

      const parsedQueryParams = EpicQueryParamsSchema.safeParse(request.query);
      if (!parsedQueryParams.success) {
        response.status(400).json({
          message: 'Invalid query params.',
          errors: parsedQueryParams.error.format(),
        });
        return;
      }

      // Excluding the date from requests to the NASA EPIC API will return the most recent image collection.
      let url: string = `${EPIC_API_URL}/${parsedQueryParams.data.collection}`;
      if (parsedQueryParams.data.date) {
        url += `/date/${parsedQueryParams.data.date}`;
      }
      const res: globalThis.Response = await fetch(
        `${EPIC_API_URL}/${parsedQueryParams.data.collection}/date/${parsedQueryParams.data.date}`,
      );
      const responseData = await res.json();
      const parsedApiResponse = EpicApiResponseSchema.safeParse(responseData);
      if (!parsedApiResponse.success) {
        throw new Error('API response does not fit the desired schema.');
      }
      if (!parsedApiResponse.data.length) {
        response.status(404).json({ message: 'Images not found.' });
        return;
      }
      response.status(200).json(parsedApiResponse.data);
      return;
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
        return;
      }
    }
  },
);

export default router;
