import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AuthClient from "../providers/AuthClient";

interface PrivateLayoutProps {
    children: React.ReactNode
}

const PrivateLayout = async ({ children }: PrivateLayoutProps) => {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/')
    }

    return <AuthClient>{children}</AuthClient>

}

export default PrivateLayout;