import { z } from "zod";


export const CreateRecordCollaboratorRequestSchema = z.object({
    user_id: z.array(z.string().uuid()),
    activity_id: z.string().uuid(),
})

export type CreateRecordCollaboratorRequestType = z.infer<typeof CreateRecordCollaboratorRequestSchema>