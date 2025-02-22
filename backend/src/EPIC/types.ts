import { z } from 'zod';

export const EpicCoordinatesSchema = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
});
export type EpicCoordinates = z.infer<typeof EpicCoordinatesSchema>;

export const EpicMetadataSchema = z.object({
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

export const EpicQueryParamsSchema = z.object({
  date: z.string().optional(),
  collection: z.string(),
});
export type EpicQueryParams = z.infer<typeof EpicQueryParamsSchema>;

export const EpicApiResponseSchema = z.array(EpicMetadataSchema);
export type EpicApiResponse = z.infer<typeof EpicApiResponseSchema>;
