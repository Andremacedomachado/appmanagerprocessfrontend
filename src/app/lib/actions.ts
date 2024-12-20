'use server'

import { signIn } from '../../../auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { CreateUserResponseFormData, CreateUserFormData, LoginResponseFormData, LoginUserFormSchema, CreateUserFormSchema, StateUser, UpdateUserFormSchema, UpdatePermissionUserFormSchema, UpdatePermissionUserFormData, StateUpdatePermissionUser, StateOrganization, UpdateOrganizationFormSchema, UpdateOrganizationFormData, StateSector, UpdateSectorFormData, UpdateSectorFormSchema, StateMessageSystem, StateActivity, UpdateActivityFormSchema, UpdateActivityFormData, UpdateActivityDateNullFormSchema, UpdateActivityDateNullFormDate } from './schemas';
import { ErrorResponse, fetchSSR } from '../utils/fetchSSR';
import { redirect } from 'next/dist/server/api-utils';
import { revalidatePath } from 'next/cache';
import { IMessageActivityProps, TYPEMESSAGE } from '../types/entities/MessageActivity';
import { IActivityProps } from '../types/entities/Activity';



export async function authenticate(prevState: LoginResponseFormData | undefined, formData: FormData) {

    const result = LoginUserFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })
    console.log(result);

    if (!result.success) {
        return { success: false, error: result.error.format() } as LoginResponseFormData
    }


    try {
        await signIn('credentials', result.data);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { success: false, error: 'Invalid credentials.' };
                default:
                    return { success: false, error: 'Something went wrong.' };
            }
        }
        throw error;
    }
}

export async function createUser(prevState: StateUser | undefined, formData: FormData): Promise<StateUser | undefined> {
    const verifyPayloadParsed = CreateUserFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        status: formData.get('status'),
        organization_sector_id: formData.get('organization_sector_id')
    } as CreateUserFormData);


    if (verifyPayloadParsed.success) {

        const response = await fetchSSR({ method: 'POST', input: process.env.NEXT_URL_API + '/user', body: verifyPayloadParsed.data })
        if (response.success) {
            revalidatePath('/dashboard/[id]/gestor/users')
            return { message: 'Ocorreu com sucesso' }
        }
        if (!response.success) {
            console.log('errror::', response.errors)
            return {
                message: 'Error insert ser Backend',
            }
        }
        return {
            message: 'Ocorreu com sucesso'
        }
    }

    return {
        message: '',
        errors: verifyPayloadParsed.error.flatten().fieldErrors
    }
}

export async function deleteUser(id: string) {
    try {
        const response = await fetchSSR({
            method: 'DELETE',
            input: process.env.NEXT_URL_API + `/user/${id}`
        })

        console.log(response)
        if (response.success) {
            revalidatePath('/dashboard/[id]/gestor/users')
            return undefined
        }
        else {
            return {
                message: 'ocorre um erro'
            }
        }
    } catch (error) {
        console.log(error)
        return {
            message: 'algo deu ruim'
        }
    }
}

export async function updateUser(id: string, prevState: StateUser | undefined, formData: FormData): Promise<StateUser | undefined> {
    try {
        console.log(formData)
        const verifyPayloadParsed = UpdateUserFormSchema.safeParse({
            name: formData.get('name') ? formData.get('name') : undefined,
            email: formData.get('email') ? formData.get('email') : undefined,
            password: formData.get('password') ? formData.get('password') : undefined,
            status: formData.get('status') ? formData.get('status') : undefined,
            organization_sector_id: formData.get('organization_sector_id') ? formData.get('organization_sector_id') : undefined

        })
        console.log(verifyPayloadParsed)
        if (!verifyPayloadParsed.success) {
            return {
                message: 'Field errror form Update'
            }
        }
        const response = await fetchSSR({
            method: 'PUT',
            input: process.env.NEXT_URL_API + `/user/${id}`,
            body: verifyPayloadParsed.data
        })
        if (response.success) {
            revalidatePath('/dashboard/[id]/gestor/users')
            return undefined
        }
        else {
            return {
                message: 'ocorre um erro'
            }
        }
    } catch (error) {
        console.log(error)
        return {
            message: 'algo deu ruim'
        }
    }
}

export async function updatePermissionUser(adjusterId: string, userId: string, prevState: StateUser | undefined, formData: FormData): Promise<StateUpdatePermissionUser | undefined> {
    try {
        console.log(formData, adjusterId, userId)
        const verifyPayloadParsed = UpdatePermissionUserFormSchema.safeParse({
            adjusterId,
            password: formData.get('password') ? formData.get('password') : undefined,
            rolesIds: [...formData.getAll('roleIds')],
            userId
        } as UpdatePermissionUserFormData)
        console.log(verifyPayloadParsed)
        if (!verifyPayloadParsed.success) {
            return {
                message: 'Field errror form Update'
            }
        }
        if (verifyPayloadParsed.data.password) {
            const { password, userId } = verifyPayloadParsed.data


            const response = await fetchSSR({
                method: 'PUT',
                input: process.env.NEXT_URL_API + `/user/${userId}`,
                body: { password }
            })
            if (!response.success) {
                return {
                    message: 'ocorre um error ao alterar senha'
                }
            }
        }
        if (verifyPayloadParsed.data.rolesIds) {
            const { rolesIds, adjusterId, userId } = verifyPayloadParsed.data

            const payload = {
                userId,
                rolesIds,
                adjusterId
            }
            const responseRoles = await fetchSSR<null>({
                method: 'POST',
                input: process.env.NEXT_URL_API + `/user/roles`,
                body: payload
            }).then(res => {
                console.log("res:", res)
                return res
            })
            if (!responseRoles.success) {
                return {
                    message: 'ocorre um error ao alterar funções'
                }
            }
        }

        revalidatePath('/dashboard/[id]/gestor/users/')
        return {
            message: 'Ocorreu tudo certo'
        }
    } catch (error) {
        console.log(error)
        return {
            message: 'algo deu ruim'
        }
    }
}


export async function updateOrganization(id: string, prevState: StateOrganization | undefined, formData: FormData): Promise<StateOrganization | undefined> {
    try {

        const verifyPayloadParsed = UpdateOrganizationFormSchema.safeParse({
            name: formData.get('name'),
            employeesAllocated: formData.get('employeesAllocated') && Number(formData.get('employeesAllocated'))
        } as UpdateOrganizationFormData)
        console.log(verifyPayloadParsed)

        if (!verifyPayloadParsed.success) {
            return {
                message: 'Error nos campos de edição',
                errors: verifyPayloadParsed.error.flatten().fieldErrors
            }
        }
        const response = await fetchSSR({
            method: 'PUT',
            input: process.env.NEXT_URL_API + `/organization/${id}`,
            body: verifyPayloadParsed.data
        })

        if (!response.success) {
            return {
                message: 'Error na requesição ao servidor'
            }
        }

        revalidatePath('/dashboard/[id]/gestor/organization')
        return undefined
    } catch (error) {
        console.log(error)
        return {
            message: 'algo deu ruim'
        }
    }
}

export async function updateSector(id: string, prevState: StateSector | undefined, formData: FormData): Promise<StateSector | undefined> {
    try {

        const verifyPayloadParsed = UpdateSectorFormSchema.safeParse({
            name: formData.get('name'),
            employeesAllocated: formData.get('employeesAllocated') && Number(formData.get('employeesAllocated')),
            organization_id: formData.get('organization_id')
        } as UpdateSectorFormData)
        console.log(verifyPayloadParsed)

        if (!verifyPayloadParsed.success) {
            return {
                message: 'Error nos campos de edição',
                errors: verifyPayloadParsed.error.flatten().fieldErrors
            }
        }
        const response = await fetchSSR({
            method: 'PUT',
            input: process.env.NEXT_URL_API + `/sector/${id}`,
            body: verifyPayloadParsed.data
        })

        if (!response.success) {
            return {
                message: 'Error na requesição ao servidor'
            }
        }

        revalidatePath('/dashboard/[id]/gestor/sector')
        return undefined
    } catch (error) {
        console.log(error)
        return {
            message: 'algo deu ruim'
        }
    }
}


export async function deleteSector(id: string) {
    try {
        const response = await fetchSSR({
            method: 'DELETE',
            input: process.env.NEXT_URL_API + `/sector/${id}`
        })

        console.log(response)
        if (response.success) {
            revalidatePath('/dashboard/[id]/gestor/sector')
            return undefined
        }
        else {
            return {
                message: 'ocorre um erro'
            }
        }
    } catch (error) {
        console.log(error)
        return {
            message: 'algo deu ruim'
        }
    }
}

export async function createMessageActivitySystem(messageSystem: Omit<IMessageActivityProps, "publication_date" | " updated_at">): Promise<ErrorResponse | undefined> {
    try {
        const input = process.env.NEXT_URL_API + '/messageActivity'

        const response = await fetchSSR({
            method: 'POST',
            input,
            body: messageSystem

        })

        if (!response.success) {
            return response.errors
        }

        return
    } catch (error) {
        console.log(error)
        return [{
            message: 'algo deu ruim',
            stack: error as string,
            status: 500
        }]
    }
}

export async function updateActivity(id: string, userId: string, prevState: StateActivity | undefined, formData: FormData): Promise<StateActivity | undefined> {
    try {
        const verifyPayloadParsed = UpdateActivityFormSchema.safeParse({
            title: formData.get('title') ? formData.get('title') : undefined,
            description: formData.get('description') ? formData.get('description') : undefined,
            progress_status: formData.get('progress_status') ? formData.get('progress_status') : undefined,
            responsible_id: formData.get(' responsible_id') ? formData.get('responsible_id') : undefined,
            due_date: formData.get('due_date') !== undefined ? formData.get('due_date') : undefined,
            start_date: formData.get('start_date') ? formData.get('start_date') : undefined
        })

        if (!verifyPayloadParsed.success) {
            return {
                message: 'Error nos campos de edição',
                errors: verifyPayloadParsed.error.flatten().fieldErrors
            }
        }
        console.log(verifyPayloadParsed, id, userId)
        const input = process.env.URL_API + `/activity/${id}`
        const response = await fetchSSR({
            method: 'PUT',
            input,
            body: verifyPayloadParsed.data
        })

        console.log(response)
        if (!response.success) {
            return {
                message: 'Error na requesição ao servidor'
            }
        }
        else {
            type KeysActivityFieldsChange = keyof Omit<IActivityProps, 'id' | 'type_node' | 'created_at' | "updated_at">

            const recordLabelPtBr: Record<KeysActivityFieldsChange, string> = {
                title: 'titulo',
                description: 'descrição',
                due_date: 'data de termino',
                start_date: 'data de inicio',
                conclusion_date: 'data de conclusão',
                progress_status: 'status de conclusão',
                responsible_id: 'responsavel'
            }

            const fieldsChange = Object.entries(verifyPayloadParsed.data).map(field => {
                return { key: field[0], value: field[1] ? true : false }
            }).filter(record => record.value)

            const labelsMessagesFieldsChange = (fieldsChange.map(o => o.key) as Array<KeysActivityFieldsChange>).map(key => recordLabelPtBr[key])


            const responseMessage = await createMessageActivitySystem({
                activity_id: id,
                content: 'ajuste nos campos de ' + labelsMessagesFieldsChange.reduce((prev, current) => prev.concat(', ' + current)) + '...',
                type_message: TYPEMESSAGE.SYSTEM,
                user_id: userId
            })
            console.log(fieldsChange, 'ajuste nos campos de ' + labelsMessagesFieldsChange.reduce((prev, current) => prev.concat(', ' + current)) + '...')
        }
        revalidatePath("/dashboard/[id]/gestor/activity/[userIdActivity]/[activityId]", "page")
    } catch (error) {
        console.log(error)
        return {
            message: 'algo deu ruim'
        }
    }
}

export async function updateActivityWithNullDate(id: string, userId: string, field: string): Promise<StateActivity | undefined> {
    const verifyPayloadParsed = UpdateActivityDateNullFormSchema.safeParse({
        [field]: true
    } as UpdateActivityDateNullFormDate)


    if (verifyPayloadParsed.success) {
        console.log('Dados Resquest null:', verifyPayloadParsed, field, null)
        const input = process.env.URL_API + `/activity/${id}`
        const response = await fetchSSR({
            method: 'PUT',
            input,
            body: verifyPayloadParsed.data
        })
        console.log(response)
        if (response.success) {
            revalidatePath("/dashboard/[id]/gestor/activity/[userIdActivity]/[activityId]", "page")
            return
        }

    }
    else {
        return {
            message: 'Erro no campo de edição',
            errors: verifyPayloadParsed.error.flatten().fieldErrors
        }
    }



}