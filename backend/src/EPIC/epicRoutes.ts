import express, { Request, Response, Router } from 'express';
import { z } from 'zod';
import dotenv from 'dotenv';

const EpicCoordinatesSchema = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
});
export type EpicCoordinates = z.infer<typeof EpicCoordinatesSchema>;

const EpicMetadataSchema = z.object({
  image: z.string(),
  date: z.string(),
  dscovr_j2000_position: EpicCoordinatesSchema,
  lunar_j2000_position: EpicCoordinatesSchema,
  sun_j2000_position: EpicCoordinatesSchema,
  centroid_coordinates: z.object({
    lat: z.number(),
    lon: z.number(),
  }),
});
export type EpicMetadata = z.infer<typeof EpicCoordinatesSchema>;

const EpicApiResponse = z.array(EpicMetadataSchema);

const EpicQueryParamsSchema = z.object({
  date: z.string(),
  collection: z.string(),
});
export type EpicQueryParams = z.infer<typeof EpicQueryParamsSchema>;

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

      const res: globalThis.Response = await fetch(
        `${EPIC_API_URL}/${parsedQueryParams.data.collection}/date/${parsedQueryParams.data.date}`,
      );

      const responseData = await res.json();
      console.log(responseData);
      const parsedApiResponse = EpicApiResponse.safeParse(responseData);

      if (!parsedApiResponse.success) {
        console.log(parsedApiResponse.error.errors);
        throw new Error('API response does not fit the desired schema.');
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
