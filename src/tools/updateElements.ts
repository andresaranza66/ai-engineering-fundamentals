import {z} from 'zod'
import {tool} from 'ai'

const updateFields = z.object({
  x: z.number().nullable(),
  y: z.number().nullable(),
  width: z.number().nullable(),
  height: z.number().nullable(),
  text: z.string().nullable(),
  fontSize: z.number().nullable(),
  textAlign: z.enum(["left", "center", "right"]).nullable(),
  strokeColor: z.string().nullable(),
  backgroundColor: z.string().nullable(),
  fillStyle: z.enum(["solid", "hachure", "cross-hatch"]).nullable(),
  strokeWidth: z.number().nullable(),
  roughness: z.number().nullable(),
  opacity: z.number().nullable(),
});

export const updateElements = tool({
    description : `Update on or more elements on the canvas by id. Pass null for ever field you do not want to update`,
    inputSchema: z.object({
        updates : z.array(z.object({id: z.string(), fields: updateFields}))
    })
})