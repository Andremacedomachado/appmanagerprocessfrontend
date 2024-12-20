import { z } from "zod"
import { IActivityProps, STATUSACTIVITY, TYPENODE } from "../types/entities/Activity"
import { USERSTATUS, UserInfo } from "../types/UserInfo"
import { IOrganizationProps } from "../types/entities/Organization"
import { ISectorProps } from "../types/entities/Sector"
import { ICollaboratorProps } from "../types/entities/Collaborator"
import { IMessageActivityProps, TYPEMESSAGE } from "../types/entities/MessageActivity"

export const LoginUserFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
})

export type LoginResponseFormData = {
    success: boolean,
    data?: LoginUserFormData,
    error?: z.ZodFormattedError<LoginUserFormData> | string
}

export type LoginUserFormData = z.infer<typeof LoginUserFormSchema>

export const CreateUserFormSchema = z.object({
    name: z.string().min(3),
    email: z.string({ required_error: 'field is required' }).email(),
    password: z.string().min(4),
    status: z.enum([USERSTATUS.ACTIVE, USERSTATUS.INACTIVE]),
    organization_sector_id: z.string().uuid()
})

export type CreateUserFormData = z.infer<typeof CreateUserFormSchema>

export type State<T extends Object> = {
    errors?: Partial<Record<keyof T, string[]>>,
    message?: string | null
}
export type StateUser = State<CreateUserFormData>

export type CreateUserResponseFormData = {
    success: boolean,
    data?: CreateUserFormData,
    error?: z.ZodFormattedError<CreateUserFormData> | string
}


export const UpdateUserFormSchema = CreateUserFormSchema.partial()

export type UpdateUserFormData = z.infer<typeof UpdateUserFormSchema>

export const UpdatePermissionUserFormSchema = z.object({
    userId: z.string().optional(),
    password: z.string().optional(),
    rolesIds: z.array(z.string().uuid()).optional(),
    adjusterId: z.string().uuid()
})

export type UpdatePermissionUserFormData = z.infer<typeof UpdatePermissionUserFormSchema>

export type StateUpdatePermissionUser = State<UpdatePermissionUserFormData>


export const OrganizationSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    employeesAllocated: z.coerce.number(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
})

export type StateOrganization = State<IOrganizationProps>

export const CreateOrganizationFormSchema = OrganizationSchema.pick({ name: true, employeesAllocated: true })

export type CreateOrganizationFormData = z.infer<typeof CreateOrganizationFormSchema>

export const UpdateOrganizationFormSchema = CreateOrganizationFormSchema.partial();

export type UpdateOrganizationFormData = z.infer<typeof UpdateOrganizationFormSchema>

export const SectorSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    employeesAllocated: z.coerce.number(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
    organization_id: z.string().uuid()
})


export type StateSector = State<ISectorProps>

export const CreateSectorFormSchema = SectorSchema.pick({ name: true, employeesAllocated: true, organization_id: true })

export type CreateSectorFormData = z.infer<typeof CreateSectorFormSchema>

export const UpdateSectorFormSchema = CreateSectorFormSchema.partial()

export type UpdateSectorFormData = z.infer<typeof UpdateSectorFormSchema>

const zodStringToDate = z.coerce.date().nullable().transform(dateOrigin => dateOrigin ? new Date(dateOrigin) : undefined);

export const ActivitySchema = z.object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string(),
    responsible_id: z.string().uuid(),
    progress_status: z.enum([STATUSACTIVITY.DO_TO, STATUSACTIVITY.CLOSED]),
    type_node: z.enum([TYPENODE.INITIAL, TYPENODE.FINALLY]),
    due_date: zodStringToDate.nullable(),
    start_date: zodStringToDate,
    created_at: zodStringToDate,
    updated_at: zodStringToDate,
    conclusion_date: zodStringToDate.nullable()
})

export type StateActivity = State<IActivityProps>

export type ActivityData = z.infer<typeof ActivitySchema>

export const GetActivitySchema = z.array(ActivitySchema)
export type GetActivityData = z.infer<typeof GetActivitySchema>


export const CreateActivitySchema = ActivitySchema.omit({
    id: true, created_at: true, updated_at: true, type_node: true
})

export type CreateActivityFormData = z.infer<typeof CreateActivitySchema>

export const UpdateActivityFormSchema = CreateActivitySchema.partial()

export type UpdateActivityFormData = z.infer<typeof UpdateActivityFormSchema>

export const ZodSchemaBooleanOption = z.boolean().optional().transform(v => v === undefined ? undefined : null)
export const UpdateActivityDateNullFormSchema = z.object({
    due_date: ZodSchemaBooleanOption,
    conclusion_date: ZodSchemaBooleanOption,
})
export type UpdateActivityDateNullFormDate = z.infer<typeof UpdateActivityDateNullFormSchema>;



export const CollaboratorSchema = z.object({
    user_id: z.string().uuid(),
    activity_id: z.string().uuid()
})

export const GetCollaboratorsSchema = z.array(CollaboratorSchema)
export type GetCollaboratorsData = z.infer<typeof GetCollaboratorsSchema>

export const RecordDependencySchema = z.object({
    parent_id: z.string().uuid(),
    children_id: z.string().uuid(),
    dependency_linked_date: z.coerce.date(),
})

export const GetRecordRelationSchema = z.array(RecordDependencySchema)
export type GetRecordRelationData = z.infer<typeof RecordDependencySchema>

export const AnnexActivitySchema = z.object({
    original_name: z.string(),
    file_name: z.string(),
    user_id: z.string().uuid(),
    activity_id: z.string().uuid(),
    url: z.string(),
    publication_date: z.coerce.date()
})

export const GetAnnexActivitySchema = z.array(AnnexActivitySchema)
export type GetAnnexActivityData = z.infer<typeof GetAnnexActivitySchema>

export const MessageActivitySchema = z.object({
    content: z.string(),
    type_message: z.enum([TYPEMESSAGE.SYSTEM, TYPEMESSAGE.USER]),
    publication_date: z.coerce.date(),
    activity_id: z.string().uuid(),
    user_id: z.string().uuid(),
    updated_at: z.coerce.date()
})

export const GetMessageActivitySchema = z.array(MessageActivitySchema)
export type GetMessageActivityData = z.infer<typeof GetMessageActivitySchema>


export type StateMessageSystem = State<IMessageActivityProps>
