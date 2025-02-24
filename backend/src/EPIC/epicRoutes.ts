import express, { Request, Response, Router } from 'express';
import { z } from 'zod';
import dotenv from 'dotenv';
import {
  EpicApiResponse,
  EpicApiResponseSchema,
  EpicMetadata,
  EpicQueryParamsSchema,
} from './types';

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
      let url: string = `${EPIC_API_URL}/${parsedQueryParams.data.collection.toLowerCase()}`;
      if (parsedQueryParams.data.date) {
        url += `/date/${parsedQueryParams.data.date}`;
      }
      console.log(url);
      const res: globalThis.Response = await fetch(url);
      const responseData = await res.json();

      const parsedApiResponse = EpicApiResponseSchema.safeParse(responseData);
      if (!parsedApiResponse.success) {
        throw new Error('API response does not fit the desired schema.');
      }
      if (!parsedApiResponse.data.length) {
        response.status(404).json({ message: 'Images not found.' });
        return;
      }

      const imageData: EpicApiResponse = parsedApiResponse.data.map((item) => {
        const date: string[] = item.date.split(' ')[0].split('-');
        const year: string = date[0];
        const month: string = date[1];
        const day: string = date[2];
        const imageSource: string = `https://epic.gsfc.nasa.gov/archive/${parsedQueryParams.data.collection.toLowerCase()}/${year}/${month}/${day}/jpg/${item.image}.jpg`;
        const thumbnail: string = `https://epic.gsfc.nasa.gov/archive/${parsedQueryParams.data.collection.toLowerCase()}/${year}/${month}/${day}/thumbs/${item.image}.jpg`;
        return {
          ...item,
          imageSourceUrl: imageSource,
          thumbnailUrl: thumbnail,
        };
      });

      response.status(200).json(imageData);
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
