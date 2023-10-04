import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Page = async () => {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        return <>carregando</>
    }
    redirect(`/${session.user.id}/test`)


}

export default Page;
