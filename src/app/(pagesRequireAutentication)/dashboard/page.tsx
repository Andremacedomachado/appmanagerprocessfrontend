
import { auth } from "../../../../auth"
import { ShowUserLogged } from "@/app/components/ui/dashboard/ShowUserLogged"

export default async function Page() {
    const session = await auth()

    return (
        <main className="p-2 flex justify-center">
            <ShowUserLogged id={session?.user.id} />

        </main>
    )
}