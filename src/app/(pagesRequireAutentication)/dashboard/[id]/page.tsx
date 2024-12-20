

import { ShowUserLogged } from "@/app/components/ui/dashboard/ShowUserLogged"
import { auth } from "../../../../../auth"

export default async function Page({ params: { id } }: { params: { id: string } }) {
    const session = await auth()

    return (
        <main className="p-2 flex justify-center">
            <ShowUserLogged id={session?.user.id} />

        </main>
    )
}