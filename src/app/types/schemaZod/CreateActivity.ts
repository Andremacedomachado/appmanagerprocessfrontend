import { z } from "zod";
import { STATUSACTIVITY, TYPENODE } from "../entities/Activity";

export const CreateActivityRequestSchema = z.object({
    title: z.string(),
    description: z.string().optional().transform(stringOrUndefined => stringOrUndefined ? stringOrUndefined : undefined),
    responsible_id: z.string().uuid(),
    due_date: z.string().optional()
        .transform(dateString => dateString ? new Date(dateString) : undefined),
    start_date: z.string().optional()
        .transform(dateString => dateString ? new Date(dateString) : undefined),
    progress_status: z.enum([STATUSACTIVITY.DO_TO, STATUSACTIVITY.CLOSED]).optional()
        .transform(status => status ? status : STATUSACTIVITY.DO_TO),
    type_node: z.enum([TYPENODE.INITIAL, TYPENODE.FINALLY]).optional()
        .transform(node => node ? node : undefined),
    created_at: z.string().optional()
        .transform(dateString => dateString ? new Date(dateString) : new Date()),
    updated_at: z.date().optional()
        .transform(dateString => dateString ? new Date(dateString) : new Date()),
})

export type CreateActivityRequestData = z.infer<typeof CreateActivityRequestSchema>