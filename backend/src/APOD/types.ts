import { z } from 'zod';

// Some APODs do not provide information for each field
// or do not include a URL to the content.
// For example, some APODs include embedded elements that are not meant to be
// used in non-NASA applications.
// As a result, some dates will not show any content or a description.
export const APODAPIResponseSchema = z.object({
  date: z.string().optional().nullable(),
  explanation: z.string().optional().nullable(),
  copyright: z.string().optional().nullable(),
  hdurl: z.string().optional().nullable(),
  media_type: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
});

export type APODAPIResponse = z.infer<typeof APODAPIResponseSchema>;
