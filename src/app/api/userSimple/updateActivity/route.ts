
import { ActivityInfo } from "@/app/types/CollectionActivityTree";
import { IActivityProps, STATUSACTIVITY, TYPENODE } from "@/app/types/entities/Activity";
import { fetchWrapperSSR } from "@/app/utils/fetchSSR";
import { formatPathToEndPoint } from "@/app/utils/pathUtils";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { ZodError, z } from "zod";

export interface ActivityUpdateByIdProps extends Partial<Omit<IActivityProps, 'id' | 'created_at'>> {
    id: string
}
export const endPointFront = formatPathToEndPoint(__dirname, 'api')
const endPointResource = '/activity/update?'

const UpdateActivityRequestSchema: z.ZodSchema<ActivityUpdateByIdProps> = z.object({
    id: z.string().uuid(),
    title: z.string().optional(),
    description: z.string().optional(),
    updated_at: z.date().optional(),
    progress_status: z.enum([STATUSACTIVITY.DO_TO, STATUSACTIVITY.CLOSED]).optional(),
    due_date: z.date().optional(),
    start_date: z.date().optional(),
    responsible_id: z.string().optional(),
    type_node: z.enum([TYPENODE.INITIAL, TYPENODE.FINALLY]).optional()

})

export async function PUT(req: Request) {
    try {
        const responsePayload = await req.json()
        const dataPayload = UpdateActivityRequestSchema.parse(responsePayload)
        const urlBackend = new URL(process.env.URL_API + endPointResource)

        const dataReponse = await fetchWrapperSSR<ActivityInfo>(
            {
                method: "PUT",
                input: urlBackend.href,
                body: dataPayload
            })
        return NextResponse.json(dataReponse)


    } catch (error) {

        var messageError: string = "Error unexpected"
        var statusError: ResponseInit["status"] = 500
        var errorContent = error
        if (error instanceof Error) {
            messageError = "Error in business role "
            statusError = 500
            errorContent = { type: error.message, stack: error.stack }
        }
        if (error instanceof ZodError) {
            messageError = "Error Zod - verify payload format"
            statusError = 400
            errorContent = error
        }


        return NextResponse.json({ message: messageError, errorContent }, { status: statusError })
    }
}