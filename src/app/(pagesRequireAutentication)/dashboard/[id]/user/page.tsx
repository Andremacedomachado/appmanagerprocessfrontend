import { getCollaborator } from "@/app/lib/data"
import Link from "next/link"

export default async function Page({ params: { id } }: { params: { id: string } }) {

    const { success, data } = await getCollaborator(id)
    if (!success) {
        return <div>deu ruim</div>
    }
    return (
        <div>
            <h1>UserId :{id}</h1>
            <pre>
                {JSON.stringify(data, null, 2)}
            </pre>

            <Link href={`/dashboard/${id}/test`}> test</Link>

        </div>
    )
}