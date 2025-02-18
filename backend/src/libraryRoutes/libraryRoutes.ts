import express, { Request, Response, Router } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router: Router = express.Router();
const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_LIBRARY_URL = process.env.LIBRARY_URL;

export interface LibraryResponseData {
  href: string;
  data: MultimediaData[];
  links: ImageLink[];
}

export interface MultimediaData {
  center: string;
  date_created: string;
  description: string;
  keywords: string[];
  location: string;
  nasa_id: string;
  title: string;
  media_type: string;
  photographer?: string;
}

export interface ImageLink {
  href: string;
  rel: string;
}

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

      const queryParams: string = new URLSearchParams(
        request.query as Record<string, string>,
      ).toString();

      const res: globalThis.Response = await fetch(
        `${NASA_LIBRARY_URL}?${queryParams}`,
      );
      console.log(`${NASA_LIBRARY_URL}?${queryParams}`);
      if (!res.ok) {
        throw new Error(
          `Internal server error ${res.status}: ${res.statusText}`,
        );
      }

      const responseData = await res.json();
      const multimediaData: LibraryResponseData[] =
        responseData?.collection?.items;

      const requiredKeys: string[] = ['data', 'href', 'links'];
      const validObjects: LibraryResponseData[] = multimediaData.filter(
        (item) => requiredKeys.every((key) => key in item),
      );
      response.status(200).json(validObjects);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  },
);

export default router;
