import express, { Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import { LibraryData } from './types';

dotenv.config();
const router: Router = express.Router();
const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_LIBRARY_URL = process.env.LIBRARY_URL;

/*
    GET data from the NASA image library API.
*/
router.get(
  '/library',
  async (request: Request, response: Response): Promise<void> => {
    try {
      if (typeof NASA_API_KEY !== 'string') {
        throw new Error('API key is not set.');
      }

      if (typeof NASA_LIBRARY_URL !== 'string') {
        throw new Error('URL is not set.');
      }
      const queryParams: string = new URLSearchParams(
        request.query as Record<string, string>,
      ).toString();

      const url: string = `${NASA_LIBRARY_URL}?${queryParams}&page_size=99`;
      const res: globalThis.Response = await fetch(url);

      if (!res.ok) {
        throw new Error(
          `Internal server error ${res.status}: ${res.statusText}`,
        );
      }

      const responseData = await res.json();

      const multimediaData: LibraryData[] = responseData?.collection?.items;
      const pageLinks: Record<'rel' | 'prompt' | 'href', string>[] | undefined =
        responseData?.collection?.links;
      const prevPage: string | undefined = pageLinks?.find(
        (element) => element['rel'] === 'prev',
      )?.href;
      const nextPage: string | undefined = pageLinks?.find(
        (element) => element['rel'] === 'next',
      )?.href;
      const requiredKeys: string[] = ['data', 'href', 'links'];
      const validObjects: LibraryData[] = multimediaData.filter((item) =>
        requiredKeys.every((key) => key in item),
      );

      response.status(200).json({
        items: validObjects,
        next: nextPage || undefined,
        prev: prevPage || undefined,
      });
      return;
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  },
);

export default router;
