import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface PrivateLayoutProps {
    children: React.ReactNode
}

const PrivateLayout = async ({ children }: PrivateLayoutProps) => {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/')
    }

    return <>{children}</>

}

export default PrivateLayout;