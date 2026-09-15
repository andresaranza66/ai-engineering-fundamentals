import { z } from "zod";
import { tool } from "ai";

export const queryCanvas = tool({
    description: `Read the current content of canvas. Call this when you need to know about elements before usingo other tools like update, remove, add, etc. Return a summary of all the elements including things like id,pos, dimension, froupId, etc`,
    inputSchema: z.object({})
})