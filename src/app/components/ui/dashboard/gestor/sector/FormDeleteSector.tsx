import { deleteSector, deleteUser } from "@/app/lib/actions"


export async function FormDeleteSector({ id }: { id: string }) {

    const deleteUserWithId = deleteSector.bind(null, id)


    return <form action={deleteUserWithId}>
        <button type="submit" className="font-semibold p-2 rounded border border-orange-400 hover:bg-red-400 hover:text-white hover:border-red-400">
            Deletar
        </button>
    </form>
}