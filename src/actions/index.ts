import { defineAction } from "astro:actions";
import { z } from "astro:schema";

import * as nasa from "@/nasa";

export const server = {
  comment: defineAction({
    accept: "form",
    input: z.object({
      path: z.string(),
      params: z.record(z.string()).optional()
    }),
    handler: async (input) => {
      return nasa.queryAPI(input.path, input.params);
    }
  })
};
