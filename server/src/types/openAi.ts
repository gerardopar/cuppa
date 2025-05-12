// validators/quoteSchema.ts
import { z } from "zod";

export const QuoteSchema = z.object({
  quote: z.string().min(1),
  author: z.string().min(1),
  year: z.coerce.number().optional(), // Handles both string or number
});

export type QuoteResponse = z.infer<typeof QuoteSchema>;
