import { z } from "zod"

export const GetCollaboratorByActivityRequestSchema = z.object({
    activityId: z.string().uuid(),
})

export type GetCollaboratorByActivityRequestData = z.infer<typeof GetCollaboratorByActivityRequestSchema>