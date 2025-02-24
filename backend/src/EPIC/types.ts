import { z } from 'zod';

export const CoordinatesSchema = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
});
export type Coordinates = z.infer<typeof CoordinatesSchema>;

export const EpicMetadataSchema = z.object({
  image: z.string(),
  date: z.string(),
  dscovr_j2000_position: CoordinatesSchema,
  lunar_j2000_position: CoordinatesSchema,
  sun_j2000_position: CoordinatesSchema,
  centroid_coordinates: z.object({
    lat: z.number(),
    lon: z.number(),
  }),
  // Image source and thumbnail url are generated after the metadata is retrieved.
  imageSourceUrl: z.string().optional(),
  thumbnailUrl: z.string().optional(),
});
export type EpicMetadata = z.infer<typeof EpicMetadataSchema>;

export const EpicQueryParamsSchema = z.object({
  date: z.string().optional(),
  collection: z.string(),
});
export type EpicQueryParams = z.infer<typeof EpicQueryParamsSchema>;

export const EpicApiResponseSchema = z.array(EpicMetadataSchema);
export type EpicApiResponse = z.infer<typeof EpicApiResponseSchema>;
